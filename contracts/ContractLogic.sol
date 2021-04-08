//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ContractLogic {

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
    token.approve(address(this), amount); // Might have to be seperate call
    token.transferFrom(_from, _to, amount);
  }
}
