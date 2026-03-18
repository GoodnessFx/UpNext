// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title EarningsOracle
 * @dev Receives verified earnings data from backend and posts on-chain.
 */
contract EarningsOracle is Ownable {
    struct EarningsData {
        uint256 amount;
        uint256 timestamp;
        string proofHash;
        bool verified;
    }

    mapping(address => mapping(uint256 => EarningsData)) public talentEarnings;
    mapping(address => bool) public authorizedSources;

    event EarningsVerified(address indexed talent, uint256 amount, uint256 timestamp, string proofHash);
    event SourceAuthorized(address source);
    event SourceRevoked(address source);

    constructor() Ownable(msg.sender) {
        authorizedSources[msg.sender] = true;
    }

    modifier onlyAuthorized() {
        require(authorizedSources[msg.sender], "Not authorized source");
        _;
    }

    /**
     * @dev Authorize a new data source.
     */
    function authorizeSource(address source) external onlyOwner {
        authorizedSources[source] = true;
        emit SourceAuthorized(source);
    }

    /**
     * @dev Revoke an authorized source.
     */
    function revokeSource(address source) external onlyOwner {
        authorizedSources[source] = false;
        emit SourceRevoked(source);
    }

    /**
     * @dev Post verified earnings data for a talent.
     */
    function postEarnings(
        address talent,
        uint256 amount,
        uint256 timestamp,
        string calldata proofHash
    ) external onlyAuthorized {
        talentEarnings[talent][timestamp] = EarningsData({
            amount: amount,
            timestamp: timestamp,
            proofHash: proofHash,
            verified: true
        });

        emit EarningsVerified(talent, amount, timestamp, proofHash);
    }

    /**
     * @dev Get earnings data for a specific talent and timestamp.
     */
    function getEarnings(address talent, uint256 timestamp) external view returns (EarningsData memory) {
        return talentEarnings[talent][timestamp];
    }
}
