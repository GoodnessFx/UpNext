// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title CommunityFlagging
 * @dev Investors flag suspicious campaigns.
 */
contract CommunityFlagging is ReentrancyGuard, Ownable {
    struct Flag {
        uint256 id;
        address flagger;
        address campaign;
        string reason;
        uint256 timestamp;
        bool processed;
    }

    uint256 public flagCount;
    uint256 public constant FLAG_THRESHOLD = 10; // Threshold to trigger a review
    
    mapping(uint256 => Flag) public flags;
    mapping(address => uint256) public campaignFlagCount;
    mapping(address => mapping(address => bool)) public hasFlagged;

    IERC20 public upnToken;

    event Flagged(uint256 indexed flagId, address indexed flagger, address indexed campaign, string reason);
    event FlagProcessed(uint256 indexed flagId, bool actionTaken);

    constructor(address _upnToken) Ownable(msg.sender) {
        upnToken = IERC20(_upnToken);
    }

    /**
     * @dev Investors flag a campaign.
     */
    function flagCampaign(address campaign, string calldata reason) external nonReentrant {
        require(campaign != address(0), "Invalid campaign address");
        require(!hasFlagged[msg.sender][campaign], "Already flagged");
        require(upnToken.balanceOf(msg.sender) >= 100 * 10 ** 18, "Must hold at least 100 UPN to flag");

        flagCount++;
        campaignFlagCount[campaign]++;
        hasFlagged[msg.sender][campaign] = true;

        flags[flagCount] = Flag({
            id: flagCount,
            flagger: msg.sender,
            campaign: campaign,
            reason: reason,
            timestamp: block.timestamp,
            processed: false
        });

        emit Flagged(flagCount, msg.sender, campaign, reason);

        if (campaignFlagCount[campaign] >= FLAG_THRESHOLD) {
            // Trigger an automatic review or pause the campaign
        }
    }

    /**
     * @dev Process a flag by the owner/admin.
     */
    function processFlag(uint256 flagId, bool actionTaken) external onlyOwner {
        Flag storage flag = flags[flagId];
        require(!flag.processed, "Flag already processed");

        flag.processed = true;
        emit FlagProcessed(flagId, actionTaken);
    }
}
