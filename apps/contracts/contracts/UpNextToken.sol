// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title UpNextToken
 * @dev The native utility and governance token for the UpNext platform.
 * $UPN is used for:
 * - Fee reduction (staking)
 * - Governance voting
 * - Rewards for investing and referring
 * - Burn mechanism on transactions (deflationary)
 */
contract UpNextToken is ERC20, ERC20Burnable, ERC20Permit, Ownable {
    constructor() ERC20("UpNext Token", "UPN") ERC20Permit("UpNext Token") Ownable(msg.sender) {
        _mint(msg.sender, 1_000_000_000 * 10 ** decimals()); // 1 Billion supply
    }

    /**
     * @dev Mint new tokens (for rewards, etc.)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
