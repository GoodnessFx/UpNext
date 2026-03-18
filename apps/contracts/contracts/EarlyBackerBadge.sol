// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title EarlyBackerBadge
 * @dev NFT badge if you invested in someone before they hit a specific milestone.
 */
contract EarlyBackerBadge is ERC721, Ownable {
    using Strings for uint256;

    struct BadgeMetadata {
        address talent;
        uint256 followersAtTime;
        uint256 investmentAmount;
        uint256 timestamp;
    }

    uint256 public badgeCount;
    mapping(uint256 => BadgeMetadata) public badgeMetadata;

    constructor() ERC721("UpNext Early Backer", "UNEB") Ownable(msg.sender) {}

    /**
     * @dev Mint a new early backer badge NFT.
     */
    function mint(
        address to,
        address talent,
        uint256 followersAtTime,
        uint256 investmentAmount
    ) external onlyOwner {
        badgeCount++;
        _safeMint(to, badgeCount);
        badgeMetadata[badgeCount] = BadgeMetadata({
            talent: talent,
            followersAtTime: followersAtTime,
            investmentAmount: investmentAmount,
            timestamp: block.timestamp
        });
    }

    /**
     * @dev Returns the token URI.
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        return string(abi.encodePacked("https://api.upnext.io/nft/early-backer/", tokenId.toString()));
    }
}
