//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {

  constructor(
    string memory _name,
    string memory _symbol,
    address _account
  )
    ERC20(_name, _symbol)
  {
    _mint(_account, 1000);
  }
}
