// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title TalentShare
 * @dev The primary contract for every talent campaign.
 */
contract TalentShare is ReentrancyGuard, Ownable {
    enum Status { OPEN, FUNDED, ACTIVE, COMPLETED, REFUNDING }

    address public talentAddress;
    uint256 public totalRaised;
    uint256 public targetAmount;
    uint256 public equityPercent; // in basis points (e.g., 1000 = 10%)
    uint256 public durationYears;
    uint256 public deployedAt;
    uint256 public fundingDeadline;
    Status public status;

    mapping(address => uint256) public investors;
    uint256 public totalInvestors;

    address public insurancePoolAddress;
    uint256 public constant INSURANCE_FEE_BPS = 200; // 2%
    uint256 public constant GHOST_REFUND_PERIOD = 30 days;
    uint256 public lastUpdateAt;
    bool public ghostingRefundTriggered;

    event Invested(address indexed investor, uint256 amount, uint256 insuranceFee);
    event Funded(uint256 totalAmount);
    event EarningsReported(uint256 amount);
    event ReturnsPaid(uint256 totalDistributed);
    event Refunded(address indexed investor, uint256 amount);
    event Disputed(string reason);
    event GhostingRefundTriggered(address indexed triggeredBy);

    /**
     * @dev Constructor to initialize the talent campaign.
     * @param _talentAddress The address of the talent who receives the funds.
     * @param _targetAmount The funding goal in wei.
     * @param _equityPercent The percentage of earnings sold (basis points).
     * @param _durationYears How long the agreement lasts.
     * @param _insurancePoolAddress The address of the insurance pool contract.
     */
    constructor(
        address _talentAddress,
        uint256 _targetAmount,
        uint256 _equityPercent,
        uint256 _durationYears,
        address _insurancePoolAddress
    ) Ownable(msg.sender) {
        talentAddress = _talentAddress;
        targetAmount = _targetAmount;
        equityPercent = _equityPercent;
        durationYears = _durationYears;
        insurancePoolAddress = _insurancePoolAddress;
        deployedAt = block.timestamp;
        lastUpdateAt = block.timestamp;
        fundingDeadline = block.timestamp + 30 days;
        status = Status.OPEN;
    }

    /**
     * @dev Invest in the talent campaign.
     */
    function invest() external payable nonReentrant {
        require(status == Status.OPEN, "Campaign is not open");
        require(block.timestamp <= fundingDeadline, "Funding deadline passed");
        require(msg.value > 0, "Investment must be greater than zero");

        uint256 insuranceFee = (msg.value * INSURANCE_FEE_BPS) / 10000;
        uint256 investmentAmount = msg.value - insuranceFee;

        if (investors[msg.sender] == 0) {
            totalInvestors++;
        }

        investors[msg.sender] += investmentAmount;
        totalRaised += investmentAmount;

        // Send insurance fee to the pool
        (bool success, ) = payable(insurancePoolAddress).call{value: insuranceFee}("");
        require(success, "Insurance fee transfer failed");

        emit Invested(msg.sender, investmentAmount, insuranceFee);

        if (totalRaised >= targetAmount) {
            status = Status.FUNDED;
        }
    }

    /**
     * @dev Release funds to the talent once the goal is reached.
     */
    function fundTalent() external nonReentrant {
        require(status == Status.FUNDED, "Campaign goal not reached");
        
        status = Status.ACTIVE;
        lastUpdateAt = block.timestamp;
        (bool success, ) = payable(talentAddress).call{value: totalRaised}("");
        require(success, "Transfer to talent failed");

        emit Funded(totalRaised);
    }

    /**
     * @dev Update the last update timestamp to prevent ghosting refund.
     * Only the talent or the platform owner can call this.
     */
    function postUpdate() external {
        require(msg.sender == talentAddress || msg.sender == owner(), "Not authorized");
        lastUpdateAt = block.timestamp;
    }

    /**
     * @dev Trigger ghosting refund if the talent has not updated for more than 30 days.
     */
    function triggerGhostingRefund() external nonReentrant {
        require(status == Status.ACTIVE, "Campaign is not active");
        require(block.timestamp > lastUpdateAt + GHOST_REFUND_PERIOD, "Ghosting period not reached");
        require(!ghostingRefundTriggered, "Refund already triggered");

        ghostingRefundTriggered = true;
        status = Status.REFUNDING;
        emit GhostingRefundTriggered(msg.sender);
    }

    /**
     * @dev Refund investors if the deadline passed and the goal was not reached or if ghosting triggered.
     */
    function refund() external nonReentrant {
        require(status == Status.OPEN || status == Status.REFUNDING, "Campaign is not in refund state");
        if (status == Status.OPEN) {
            require(block.timestamp > fundingDeadline, "Deadline not reached");
            require(totalRaised < targetAmount, "Goal was reached");
        }

        uint256 amount = investors[msg.sender];
        require(amount > 0, "No investment to refund");

        investors[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Refund failed");

        emit Refunded(msg.sender, amount);
    }

    /**
     * @dev Oracle calls this to report monthly earnings.
     * @param amount The total earnings reported.
     */
    function reportEarnings(uint256 amount) external onlyOwner {
        require(status == Status.ACTIVE, "Campaign is not active");
        emit EarningsReported(amount);
    }

    /**
     * @dev Auto-pay all investors their % of reported earnings.
     * This is a simplified version; real implementation might use a claim-based pattern to save gas.
     */
    function distributeReturns() external payable nonReentrant {
        require(status == Status.ACTIVE, "Campaign is not active");
        require(msg.value > 0, "Distribution amount must be greater than zero");

        emit ReturnsPaid(msg.value);
    }

    /**
     * @dev Emergency pause by owner only.
     */
    function emergencyPause() external onlyOwner {
        // Implement pause logic
    }

    /**
     * @dev Investor raises a dispute, locking funds.
     * @param reason The reason for the dispute.
     */
    function dispute(string calldata reason) external {
        require(investors[msg.sender] > 0, "Only investors can dispute");
        emit Disputed(reason);
    }

    receive() external payable {}
}
