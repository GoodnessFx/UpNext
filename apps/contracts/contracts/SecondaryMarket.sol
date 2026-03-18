// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

/**
 * @title SecondaryMarket
 * @dev Order book for trading talent shares represented as ERC-1155 tokens.
 */
contract SecondaryMarket is ReentrancyGuard, Ownable, ERC1155Holder {
    struct Listing {
        uint256 id;
        address seller;
        uint256 tokenId;
        uint256 price;
        uint256 quantity;
        bool active;
    }

    struct Offer {
        uint256 id;
        address bidder;
        uint256 tokenId;
        uint256 price;
        uint256 quantity;
        bool active;
    }

    uint256 public listingCount;
    uint256 public offerCount;
    address public platformFeeAddress;
    address public insurancePoolAddress;
    
    // Fee: 2.5% on every trade, split: 1.5% platform, 1% insurance pool
    uint256 public constant PLATFORM_FEE_BPS = 150; // 1.5%
    uint256 public constant INSURANCE_FEE_BPS = 100; // 1%

    mapping(uint256 => Listing) public listings;
    mapping(uint256 => Offer) public offers;
    IERC1155 public talentShareToken;

    event Listed(uint256 indexed listingId, address indexed seller, uint256 tokenId, uint256 price, uint256 quantity);
    event Sold(uint256 indexed listingId, address indexed buyer, uint256 price, uint256 quantity);
    event ListingCancelled(uint256 indexed listingId);
    event OfferMade(uint256 indexed offerId, address indexed bidder, uint256 tokenId, uint256 price, uint256 quantity);
    event OfferAccepted(uint256 indexed offerId, address indexed seller, uint256 price, uint256 quantity);

    constructor(
        address _talentShareToken,
        address _platformFeeAddress,
        address _insurancePoolAddress
    ) Ownable(msg.sender) {
        talentShareToken = IERC1155(_talentShareToken);
        platformFeeAddress = _platformFeeAddress;
        insurancePoolAddress = _insurancePoolAddress;
    }

    /**
     * @dev List shares for sale.
     */
    function listShares(uint256 tokenId, uint256 price, uint256 quantity) external nonReentrant {
        require(price > 0, "Price must be greater than zero");
        require(quantity > 0, "Quantity must be greater than zero");
        require(talentShareToken.balanceOf(msg.sender, tokenId) >= quantity, "Insufficient balance");
        require(talentShareToken.isApprovedForAll(msg.sender, address(this)), "Not approved");

        listingCount++;
        listings[listingCount] = Listing({
            id: listingCount,
            seller: msg.sender,
            tokenId: tokenId,
            price: price,
            quantity: quantity,
            active: true
        });

        emit Listed(listingCount, msg.sender, tokenId, price, quantity);
    }

    /**
     * @dev Buy shares from a listing.
     */
    function buyShares(uint256 listingId) external payable nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing is not active");
        require(msg.value >= listing.price, "Insufficient payment");

        listing.active = false;
        
        uint256 platformFee = (msg.value * PLATFORM_FEE_BPS) / 10000;
        uint256 insuranceFee = (msg.value * INSURANCE_FEE_BPS) / 10000;
        uint256 sellerProceeds = msg.value - platformFee - insuranceFee;

        talentShareToken.safeTransferFrom(listing.seller, msg.sender, listing.tokenId, listing.quantity, "");
        
        (bool pSuccess, ) = payable(platformFeeAddress).call{value: platformFee}("");
        require(pSuccess, "Platform fee transfer failed");

        (bool iSuccess, ) = payable(insurancePoolAddress).call{value: insuranceFee}("");
        require(iSuccess, "Insurance fee transfer failed");

        (bool sSuccess, ) = payable(listing.seller).call{value: sellerProceeds}("");
        require(sSuccess, "Seller proceeds transfer failed");

        emit Sold(listingId, msg.sender, listing.price, listing.quantity);
    }

    /**
     * @dev Cancel a listing.
     */
    function cancelListing(uint256 listingId) external {
        Listing storage listing = listings[listingId];
        require(listing.seller == msg.sender, "Only seller can cancel");
        require(listing.active, "Listing is not active");

        listing.active = false;
        emit ListingCancelled(listingId);
    }

    /**
     * @dev Make an offer on shares.
     */
    function makeOffer(uint256 tokenId, uint256 price, uint256 quantity) external payable nonReentrant {
        require(price > 0, "Price must be greater than zero");
        require(msg.value >= price, "Insufficient payment for offer");

        offerCount++;
        offers[offerCount] = Offer({
            id: offerCount,
            bidder: msg.sender,
            tokenId: tokenId,
            price: price,
            quantity: quantity,
            active: true
        });

        emit OfferMade(offerCount, msg.sender, tokenId, price, quantity);
    }

    /**
     * @dev Accept an offer as a seller.
     */
    function acceptOffer(uint256 offerId) external nonReentrant {
        Offer storage offer = offers[offerId];
        require(offer.active, "Offer is not active");
        require(talentShareToken.balanceOf(msg.sender, offer.tokenId) >= offer.quantity, "Insufficient balance");
        require(talentShareToken.isApprovedForAll(msg.sender, address(this)), "Not approved");

        offer.active = false;
        
        uint256 platformFee = (offer.price * PLATFORM_FEE_BPS) / 10000;
        uint256 insuranceFee = (offer.price * INSURANCE_FEE_BPS) / 10000;
        uint256 sellerProceeds = offer.price - platformFee - insuranceFee;

        talentShareToken.safeTransferFrom(msg.sender, offer.bidder, offer.tokenId, offer.quantity, "");
        
        (bool pSuccess, ) = payable(platformFeeAddress).call{value: platformFee}("");
        require(pSuccess, "Platform fee transfer failed");

        (bool iSuccess, ) = payable(insurancePoolAddress).call{value: insuranceFee}("");
        require(iSuccess, "Insurance fee transfer failed");

        (bool sSuccess, ) = payable(msg.sender).call{value: sellerProceeds}("");
        require(sSuccess, "Seller proceeds transfer failed");

        emit OfferAccepted(offerId, msg.sender, offer.price, offer.quantity);
    }
}
