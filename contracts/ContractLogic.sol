//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Logic for Proxy Wallet
 * @author Jacob San Juan
 */
contract ContractLogic {

  /**
   * @notice Transfers ERC20 tokens
   * @dev Approves address(this) to transfer tokens
   * @param _tokenAddress, address of token contract for token to be trasnferred
   * @param _from, address being transferred from
   * @param _to, address being transferred to
   * @param amount, number of tokens to be transferred
   */
  function transfer(
    address _tokenAddress,
    address _from,
    address _to,
    uint amount
  )
    external
    virtual
  {
    IERC20 token = IERC20(_tokenAddress);
    token.approve(address(this), amount);
    token.transferFrom(_from, _to, amount);
  }
}
