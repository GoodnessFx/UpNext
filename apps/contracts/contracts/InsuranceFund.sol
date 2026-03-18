// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title InsuranceFund
 * @dev 2% of every investment goes here. Governance based claims and payouts.
 */
contract InsuranceFund is ReentrancyGuard, Ownable {
    struct Claim {
        uint256 id;
        address claimant;
        address talent;
        uint256 amount;
        string proofHash;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 deadline;
        bool processed;
        bool approved;
    }

    uint256 public claimCount;
    uint256 public constant CLAIM_PERIOD = 7 days;
    uint256 public constant MAX_PAYOUT_PERCENT = 50; // Max 50% payout of investment
    
    mapping(uint256 => Claim) public claims;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    
    // UPN token holders can vote on claims
    IERC20 public upnToken;

    event ClaimSubmitted(uint256 indexed claimId, address indexed claimant, address indexed talent, uint256 amount);
    event Voted(uint256 indexed claimId, address indexed voter, bool support, uint256 weight);
    event ClaimProcessed(uint256 indexed claimId, bool approved, uint256 payout);

    constructor(address _upnToken) Ownable(msg.sender) {
        upnToken = IERC20(_upnToken);
    }

    /**
     * @dev Submit a new insurance claim.
     */
    function submitClaim(address talent, uint256 amount, string calldata proofHash) external nonReentrant {
        require(amount > 0, "Amount must be greater than zero");

        claimCount++;
        claims[claimCount] = Claim({
            id: claimCount,
            claimant: msg.sender,
            talent: talent,
            amount: amount,
            proofHash: proofHash,
            votesFor: 0,
            votesAgainst: 0,
            deadline: block.timestamp + CLAIM_PERIOD,
            processed: false,
            approved: false
        });

        emit ClaimSubmitted(claimCount, msg.sender, talent, amount);
    }

    /**
     * @dev Vote on a pending claim.
     */
    function vote(uint256 claimId, bool support) external nonReentrant {
        Claim storage claim = claims[claimId];
        require(!claim.processed, "Claim already processed");
        require(block.timestamp <= claim.deadline, "Voting deadline passed");
        require(!hasVoted[claimId][msg.sender], "Already voted");

        uint256 weight = upnToken.balanceOf(msg.sender);
        require(weight > 0, "Must hold UPN tokens to vote");

        if (support) {
            claim.votesFor += weight;
        } else {
            claim.votesAgainst += weight;
        }

        hasVoted[claimId][msg.sender] = true;
        emit Voted(claimId, msg.sender, support, weight);
    }

    /**
     * @dev Process a claim after the deadline.
     */
    function processClaim(uint256 claimId) external nonReentrant {
        Claim storage claim = claims[claimId];
        require(!claim.processed, "Claim already processed");
        require(block.timestamp > claim.deadline, "Voting deadline not reached");

        claim.processed = true;
        
        if (claim.votesFor > claim.votesAgainst) {
            claim.approved = true;
            uint256 payout = (claim.amount * MAX_PAYOUT_PERCENT) / 100;
            
            (bool success, ) = payable(claim.claimant).call{value: payout}("");
            require(success, "Payout transfer failed");
            
            emit ClaimProcessed(claimId, true, payout);
        } else {
            emit ClaimProcessed(claimId, false, 0);
        }
    }

    /**
     * @dev Allow the contract to receive funds from the SecondaryMarket.
     */
    receive() external payable {}
}
