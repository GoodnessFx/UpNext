// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title UpNextVault
 * @dev Handles locked savings, DCA (Recurring investments), and Yield generation.
 */
contract UpNextVault is ReentrancyGuard, Ownable {
    struct LockedDeposit {
        uint256 amount;
        uint256 unlockTime;
        bool withdrawn;
    }

    struct DCAPlan {
        address investor;
        address talentCampaign;
        uint256 amountPerPeriod;
        uint256 periodSeconds;
        uint256 lastExecution;
        bool active;
    }

    mapping(address => LockedDeposit[]) public lockedDeposits;
    mapping(uint256 => DCAPlan) public dcaPlans;
    uint256 public dcaPlanCount;

    uint256 public constant LOCK_PERIOD = 90 days;
    uint256 public constant BONUS_YIELD_BPS = 500; // 5% bonus for locking

    event Locked(address indexed investor, uint256 amount, uint256 unlockTime);
    event Withdrawn(address indexed investor, uint256 amount);
    event DCAPlanCreated(uint256 indexed planId, address indexed investor, address indexed talentCampaign, uint256 amount);
    event DCAExecuted(uint256 indexed planId, uint256 amount);

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Commit capital for 90 days to earn bonus yield.
     */
    function lockCapital() external payable nonReentrant {
        require(msg.value > 0, "Amount must be greater than zero");

        lockedDeposits[msg.sender].push(LockedDeposit({
            amount: msg.value,
            unlockTime: block.timestamp + LOCK_PERIOD,
            withdrawn: false
        }));

        emit Locked(msg.sender, msg.value, block.timestamp + LOCK_PERIOD);
    }

    /**
     * @dev Withdraw locked capital after the lock period.
     */
    function withdrawLocked(uint256 index) external nonReentrant {
        LockedDeposit storage deposit = lockedDeposits[msg.sender][index];
        require(block.timestamp >= deposit.unlockTime, "Capital is still locked");
        require(!deposit.withdrawn, "Already withdrawn");

        deposit.withdrawn = true;
        uint256 bonus = (deposit.amount * BONUS_YIELD_BPS) / 10000;
        uint256 totalAmount = deposit.amount + bonus;

        (bool success, ) = payable(msg.sender).call{value: totalAmount}("");
        require(success, "Withdrawal failed");

        emit Withdrawn(msg.sender, totalAmount);
    }

    /**
     * @dev Create a recurring investment (DCA) plan.
     */
    function createDCAPlan(address talentCampaign, uint256 amountPerPeriod, uint256 periodSeconds) external nonReentrant {
        require(talentCampaign != address(0), "Invalid campaign address");
        require(amountPerPeriod > 0, "Amount must be greater than zero");
        require(periodSeconds >= 1 days, "Period must be at least 1 day");

        dcaPlanCount++;
        dcaPlans[dcaPlanCount] = DCAPlan({
            investor: msg.sender,
            talentCampaign: talentCampaign,
            amountPerPeriod: amountPerPeriod,
            periodSeconds: periodSeconds,
            lastExecution: block.timestamp,
            active: true
        });

        emit DCAPlanCreated(dcaPlanCount, msg.sender, talentCampaign, amountPerPeriod);
    }

    /**
     * @dev Execute a DCA plan. This would be called by a bot or keeper.
     * In a real implementation, this would handle ERC20 transfers or internal balance updates.
     */
    function executeDCA(uint256 planId) external nonReentrant {
        DCAPlan storage plan = dcaPlans[planId];
        require(plan.active, "Plan is not active");
        require(block.timestamp >= plan.lastExecution + plan.periodSeconds, "Too soon for next execution");

        plan.lastExecution = block.timestamp;
        
        // This is a placeholder for actual investment logic
        // In a real scenario, this would call TalentShare.invest()
        
        emit DCAExecuted(planId, plan.amountPerPeriod);
    }

    /**
     * @dev Stop a DCA plan.
     */
    function stopDCAPlan(uint256 planId) external {
        require(dcaPlans[planId].investor == msg.sender, "Not your plan");
        dcaPlans[planId].active = false;
    }

    receive() external payable {}
}
