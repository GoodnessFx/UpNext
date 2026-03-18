// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./TalentShare.sol";

/**
 * @title TalentPack
 * @dev Curated bundles of talent campaigns for one-click investing.
 */
contract TalentPack is ReentrancyGuard, Ownable {
    struct Pack {
        string name;
        string description;
        address[] campaigns;
        uint256[] weights; // in basis points, total should be 10000
        bool active;
    }

    mapping(uint256 => Pack) public packs;
    uint256 public packCount;

    event PackCreated(uint256 indexed packId, string name, string description, address[] campaigns);
    event InvestedInPack(uint256 indexed packId, address indexed investor, uint256 totalAmount);

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Create a new curated pack.
     */
    function createPack(
        string calldata name,
        string calldata description,
        address[] calldata campaigns,
        uint256[] calldata weights
    ) external onlyOwner {
        require(campaigns.length == weights.length, "Mismatched arrays");
        require(campaigns.length > 0, "No campaigns provided");

        uint256 totalWeight = 0;
        for (uint256 i = 0; i < weights.length; i++) {
            totalWeight += weights[i];
        }
        require(totalWeight == 10000, "Weights must sum to 10000 (100%)");

        packCount++;
        packs[packCount] = Pack({
            name: name,
            description: description,
            campaigns: campaigns,
            weights: weights,
            active: true
        });

        emit PackCreated(packCount, name, description, campaigns);
    }

    /**
     * @dev Invest in a curated pack with one click.
     */
    function investInPack(uint256 packId) external payable nonReentrant {
        Pack storage pack = packs[packId];
        require(pack.active, "Pack is not active");
        require(msg.value > 0, "Amount must be greater than zero");

        uint256 totalAmount = msg.value;

        for (uint256 i = 0; i < pack.campaigns.length; i++) {
            uint256 investmentAmount = (totalAmount * pack.weights[i]) / 10000;
            if (investmentAmount > 0) {
                TalentShare campaign = TalentShare(payable(pack.campaigns[i]));
                campaign.invest{value: investmentAmount}();
            }
        }

        emit InvestedInPack(packId, msg.sender, totalAmount);
    }

    /**
     * @dev Deactivate a pack.
     */
    function deactivatePack(uint256 packId) external onlyOwner {
        packs[packId].active = false;
    }
}
