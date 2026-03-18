// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./TalentShare.sol";

/**
 * @title TalentStockIndex
 * @dev "The UpNext Music 20" — index of top 20 music talents. Invest in the whole index.
 */
contract TalentStockIndex is ReentrancyGuard, Ownable {
    struct Index {
        string name;
        address[] campaigns;
        uint256[] weights;
        bool active;
    }

    mapping(uint256 => Index) public indices;
    uint256 public indexCount;

    event IndexCreated(uint256 indexed indexId, string name, address[] campaigns);
    event InvestedInIndex(uint256 indexed indexId, address indexed investor, uint256 totalAmount);

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Create a new talent index.
     */
    function createIndex(
        string calldata name,
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

        indexCount++;
        indices[indexCount] = Index({
            name: name,
            campaigns: campaigns,
            weights: weights,
            active: true
        });

        emit IndexCreated(indexCount, name, campaigns);
    }

    /**
     * @dev Invest in a talent index with one click.
     */
    function investInIndex(uint256 indexId) external payable nonReentrant {
        Index storage index = indices[indexId];
        require(index.active, "Index is not active");
        require(msg.value > 0, "Amount must be greater than zero");

        uint256 totalAmount = msg.value;

        for (uint256 i = 0; i < index.campaigns.length; i++) {
            uint256 investmentAmount = (totalAmount * index.weights[i]) / 10000;
            if (investmentAmount > 0) {
                TalentShare campaign = TalentShare(payable(index.campaigns[i]));
                campaign.invest{value: investmentAmount}();
            }
        }

        emit InvestedInIndex(indexId, msg.sender, totalAmount);
    }
}
