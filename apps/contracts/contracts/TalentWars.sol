// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title TalentWars
 * @dev Weekly head-to-head poll. Vote with $UPN tokens. Winner gets pot.
 */
contract TalentWars is ReentrancyGuard, Ownable {
    struct Battle {
        uint256 id;
        address talent1;
        address talent2;
        uint256 votes1;
        uint256 votes2;
        uint256 totalPot;
        uint256 deadline;
        bool processed;
    }

    uint256 public battleCount;
    mapping(uint256 => Battle) public battles;
    mapping(uint256 => mapping(address => uint256)) public userVotes1;
    mapping(uint256 => mapping(address => uint256)) public userVotes2;

    IERC20 public upnToken;
    uint256 public constant BATTLE_DURATION = 7 days;

    event BattleStarted(uint256 indexed battleId, address talent1, address talent2, uint256 deadline);
    event Voted(uint256 indexed battleId, address indexed voter, uint8 talentChoice, uint256 amount);
    event BattleSettled(uint256 indexed battleId, address winner, uint256 winningPot);

    constructor(address _upnToken) Ownable(msg.sender) {
        upnToken = IERC20(_upnToken);
    }

    /**
     * @dev Start a new head-to-head battle.
     */
    function startBattle(address talent1, address talent2) external onlyOwner {
        battleCount++;
        battles[battleCount] = Battle({
            id: battleCount,
            talent1: talent1,
            talent2: talent2,
            votes1: 0,
            votes2: 0,
            totalPot: 0,
            deadline: block.timestamp + BATTLE_DURATION,
            processed: false
        });

        emit BattleStarted(battleCount, talent1, talent2, block.timestamp + BATTLE_DURATION);
    }

    /**
     * @dev Vote in a battle with $UPN tokens.
     */
    function vote(uint256 battleId, uint8 talentChoice, uint256 amount) external nonReentrant {
        Battle storage battle = battles[battleId];
        require(!battle.processed, "Battle already processed");
        require(block.timestamp <= battle.deadline, "Battle deadline passed");
        require(talentChoice == 1 || talentChoice == 2, "Invalid choice");
        require(amount > 0, "Amount must be greater than zero");

        // Transfer UPN tokens to the contract
        require(upnToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        if (talentChoice == 1) {
            battle.votes1 += amount;
            userVotes1[battleId][msg.sender] += amount;
        } else {
            battle.votes2 += amount;
            userVotes2[battleId][msg.sender] += amount;
        }

        battle.totalPot += amount;
        emit Voted(battleId, msg.sender, talentChoice, amount);
    }

    /**
     * @dev Settle a battle and distribute the pot to winners.
     * In a simplified version, this just emits an event.
     * In a full version, this would allow winners to claim their share of the pot.
     */
    function settleBattle(uint256 battleId) external nonReentrant {
        Battle storage battle = battles[battleId];
        require(!battle.processed, "Battle already processed");
        require(block.timestamp > battle.deadline, "Battle deadline not reached");

        battle.processed = true;
        address winner = battle.votes1 >= battle.votes2 ? battle.talent1 : battle.talent2;
        
        emit BattleSettled(battleId, winner, battle.totalPot);
    }

    /**
     * @dev Claim rewards for winning voters.
     */
    function claimRewards(uint256 battleId) external nonReentrant {
        Battle storage battle = battles[battleId];
        require(battle.processed, "Battle not processed yet");

        address winner = battle.votes1 >= battle.votes2 ? battle.talent1 : battle.talent2;
        uint256 userContribution = winner == battle.talent1 ? userVotes1[battleId][msg.sender] : userVotes2[battleId][msg.sender];
        require(userContribution > 0, "No winning votes");

        uint256 winningVotes = winner == battle.talent1 ? battle.votes1 : battle.votes2;
        uint256 reward = (userContribution * battle.totalPot) / winningVotes;

        // Clear user's votes to prevent double claim
        if (winner == battle.talent1) {
            userVotes1[battleId][msg.sender] = 0;
        } else {
            userVotes2[battleId][msg.sender] = 0;
        }

        require(upnToken.transfer(msg.sender, reward), "Reward transfer failed");
    }
}
