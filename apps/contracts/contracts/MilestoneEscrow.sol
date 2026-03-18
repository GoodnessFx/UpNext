// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title MilestoneEscrow
 * @dev Staged funding with voting.
 */
contract MilestoneEscrow is ReentrancyGuard, Ownable {
    struct Milestone {
        uint256 id;
        string description;
        uint256 amount;
        bool completed;
        bool approved;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 deadline;
    }

    uint256 public totalMilestones;
    mapping(uint256 => Milestone) public milestones;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    address public talentAddress;
    IERC20 public upnToken;
    uint256 public constant VOTING_PERIOD = 7 days;

    event MilestoneAdded(uint256 indexed id, string description, uint256 amount);
    event MilestoneProposed(uint256 indexed id);
    event Voted(uint256 indexed id, address indexed voter, bool support, uint256 weight);
    event MilestoneReleased(uint256 indexed id, uint256 amount);

    constructor(address _talentAddress, address _upnToken) Ownable(msg.sender) {
        talentAddress = _talentAddress;
        upnToken = IERC20(_upnToken);
    }

    /**
     * @dev Add a milestone for the talent.
     */
    function addMilestone(string calldata description, uint256 amount) external onlyOwner {
        totalMilestones++;
        milestones[totalMilestones] = Milestone({
            id: totalMilestones,
            description: description,
            amount: amount,
            completed: false,
            approved: false,
            votesFor: 0,
            votesAgainst: 0,
            deadline: 0
        });

        emit MilestoneAdded(totalMilestones, description, amount);
    }

    /**
     * @dev Talent proposes that a milestone is complete and requests funding.
     */
    function proposeMilestoneCompletion(uint256 id) external {
        require(msg.sender == talentAddress, "Only talent can propose completion");
        require(!milestones[id].completed, "Milestone already completed");

        milestones[id].deadline = block.timestamp + VOTING_PERIOD;
        emit MilestoneProposed(id);
    }

    /**
     * @dev Investors vote on the milestone completion.
     */
    function vote(uint256 id, bool support) external nonReentrant {
        Milestone storage milestone = milestones[id];
        require(!milestone.completed, "Milestone already completed");
        require(milestone.deadline > 0, "Milestone not proposed for completion");
        require(block.timestamp <= milestone.deadline, "Voting deadline passed");
        require(!hasVoted[id][msg.sender], "Already voted");

        uint256 weight = upnToken.balanceOf(msg.sender);
        require(weight > 0, "Must hold UPN to vote");

        if (support) {
            milestone.votesFor += weight;
        } else {
            milestone.votesAgainst += weight;
        }

        hasVoted[id][msg.sender] = true;
        emit Voted(id, msg.sender, support, weight);
    }

    /**
     * @dev Release funds for a milestone if approved.
     */
    function releaseMilestone(uint256 id) external nonReentrant {
        Milestone storage milestone = milestones[id];
        require(!milestone.completed, "Milestone already completed");
        require(block.timestamp > milestone.deadline, "Voting deadline not reached");

        milestone.completed = true;
        if (milestone.votesFor > milestone.votesAgainst) {
            milestone.approved = true;
            (bool success, ) = payable(talentAddress).call{value: milestone.amount}("");
            require(success, "Fund release failed");
            emit MilestoneReleased(id, milestone.amount);
        }
    }

    receive() external payable {}
}
