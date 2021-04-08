//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Proxy.sol";

/**
 * @title A proxy wallet
 * @author Jacob San Juan
 * @notice  Delegates functionality to a different contract, owns and controls
 *  ERC20 tokens.
 */
contract ContractProxy is Proxy, Ownable {

  address public implementationAddr;

  constructor(address _implementationAddr) Ownable() {
    implementationAddr = _implementationAddr;
  }

  /**
   * @return implementation contract address to parent
   */
  function _implementation() internal view virtual override returns (address) {
    return implementationAddr;
  }

  /**
   * @return implementation address to caller
   */
  function getImplementation() external view returns (address) {
    return implementationAddr;
  }
}
