// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

/**
 * @title TalentShareToken
 * @dev NFT representing investor ownership stake in a talent campaign.
 * Each token ID corresponds to a specific TalentShare campaign.
 */
contract TalentShareToken is ERC1155, Ownable, ERC1155Supply {
    using Strings for uint256;

    struct TalentMetadata {
        string name;
        uint256 equityPercent;
        uint256 investmentAmount;
        address campaignAddress;
    }

    mapping(uint256 => TalentMetadata) public talentMetadata;
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC1155("") Ownable(msg.sender) {}

    /**
     * @dev Mint a new talent share NFT.
     * @param to The address of the investor.
     * @param tokenId The ID for the specific talent campaign.
     * @param amount The number of shares to mint.
     * @param data Metadata for the talent campaign.
     */
    function mint(
        address to,
        uint256 tokenId,
        uint256 amount,
        bytes memory data,
        TalentMetadata memory metadata
    ) external onlyOwner {
        _mint(to, tokenId, amount, data);
        talentMetadata[tokenId] = metadata;
    }

    /**
     * @dev Set a custom URI for a specific token.
     * @param tokenId The ID for the specific talent campaign.
     * @param newURI The URI for the metadata.
     */
    function setURI(uint256 tokenId, string memory newURI) external onlyOwner {
        _tokenURIs[tokenId] = newURI;
    }

    /**
     * @dev Return the dynamic SVG on-chain metadata.
     * In a full implementation, this would return a base64 encoded SVG.
     */
    function uri(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    /**
     * @dev Overridden to update TalentShare investor mapping on transfer.
     */
    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal virtual override(ERC1155, ERC1155Supply) {
        super._update(from, to, ids, values);
        
        // In a real implementation, we would call the TalentShare contract
        // to update its internal mapping of investors.
    }
}
