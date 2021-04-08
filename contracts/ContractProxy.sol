//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Proxy.sol";

contract ContractProxy is Proxy, Ownable {

  address public implementationAddr;

  constructor(address _implementationAddr) Ownable() {
    implementationAddr = _implementationAddr;
  }

  function _implementation() internal view virtual override returns (address) {
    return implementationAddr;
  }

  /*
  * @dev: For testing purposes
  */
  function getImplementation() external view returns (address) {
    return implementationAddr;
  }
}
