// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title PredictionMarket
 * @dev Bet USDT on "Will [talent] hit 1M streams by December?" Resolves on-chain via oracle.
 */
contract PredictionMarket is ReentrancyGuard, Ownable {
    enum Outcome { PENDING, YES, NO }

    struct Market {
        uint256 id;
        address talent;
        string question;
        uint256 deadline;
        uint256 totalYes;
        uint256 totalNo;
        Outcome outcome;
        bool resolved;
    }

    uint256 public marketCount;
    mapping(uint256 => Market) public markets;
    mapping(uint256 => mapping(address => uint256)) public betsYes;
    mapping(uint256 => mapping(address => uint256)) public betsNo;

    IERC20 public usdt;
    uint256 public constant PLATFORM_FEE_BPS = 250; // 2.5%

    event MarketCreated(uint256 indexed marketId, address indexed talent, string question, uint256 deadline);
    event BetPlaced(uint256 indexed marketId, address indexed bettor, bool prediction, uint256 amount);
    event MarketResolved(uint256 indexed marketId, Outcome outcome);

    constructor(address _usdt) Ownable(msg.sender) {
        usdt = IERC20(_usdt);
    }

    /**
     * @dev Create a new prediction market.
     */
    function createMarket(address talent, string calldata question, uint256 deadline) external onlyOwner {
        marketCount++;
        markets[marketCount] = Market({
            id: marketCount,
            talent: talent,
            question: question,
            deadline: deadline,
            totalYes: 0,
            totalNo: 0,
            outcome: Outcome.PENDING,
            resolved: false
        });

        emit MarketCreated(marketCount, talent, question, deadline);
    }

    /**
     * @dev Place a bet on a market.
     */
    function placeBet(uint256 marketId, bool prediction, uint256 amount) external nonReentrant {
        Market storage market = markets[marketId];
        require(!market.resolved, "Market already resolved");
        require(block.timestamp < market.deadline, "Market deadline passed");
        require(amount > 0, "Amount must be greater than zero");

        require(usdt.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        if (prediction) {
            market.totalYes += amount;
            betsYes[marketId][msg.sender] += amount;
        } else {
            market.totalNo += amount;
            betsNo[marketId][msg.sender] += amount;
        }

        emit BetPlaced(marketId, msg.sender, prediction, amount);
    }

    /**
     * @dev Resolve a market. Only owner/admin can resolve (or a decentralized oracle).
     */
    function resolveMarket(uint256 marketId, Outcome outcome) external onlyOwner {
        Market storage market = markets[marketId];
        require(!market.resolved, "Market already resolved");
        require(outcome != Outcome.PENDING, "Invalid outcome");

        market.resolved = true;
        market.outcome = outcome;

        emit MarketResolved(marketId, outcome);
    }

    /**
     * @dev Claim rewards for winning bettors.
     */
    function claimRewards(uint256 marketId) external nonReentrant {
        Market storage market = markets[marketId];
        require(market.resolved, "Market not resolved yet");

        uint256 userBet = market.outcome == Outcome.YES ? betsYes[marketId][msg.sender] : betsNo[marketId][msg.sender];
        require(userBet > 0, "No winning bet found");

        uint256 winningTotal = market.outcome == Outcome.YES ? market.totalYes : market.totalNo;
        uint256 losingTotal = market.outcome == Outcome.YES ? market.totalNo : market.totalYes;
        uint256 totalPool = winningTotal + losingTotal;

        // Platform fee
        uint256 platformFee = (totalPool * PLATFORM_FEE_BPS) / 10000;
        uint256 distributablePool = totalPool - platformFee;

        uint256 reward = (userBet * distributablePool) / winningTotal;

        // Clear user's bet to prevent double claim
        if (market.outcome == Outcome.YES) {
            betsYes[marketId][msg.sender] = 0;
        } else {
            betsNo[marketId][msg.sender] = 0;
        }

        require(usdt.transfer(msg.sender, reward), "Reward transfer failed");
    }
}
