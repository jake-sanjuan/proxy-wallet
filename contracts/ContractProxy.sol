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
   * @dev overridden from Parent contract to make sure that onlyOwner can
   *  use ContractLogic.sol.  This will stop others from being able to transfer
   *  tokens out.
   */
  fallback() external payable virtual override onlyOwner {
    _fallback();
  }

  /**
   * @dev overridden from Parent contract to make sure that onlyOwner can
   *  call and to revert because this is a wallet specifically for ERC20 tokens.
   * This will stop others from being able to transfer tokens out.
   */
  receive() external payable virtual override onlyOwner {
    revert("Wallet is for ERC20 tokens only");
  }

  /**
   * @return implementation address to caller
   */
  function getImplementation() external view returns (address) {
    return implementationAddr;
  }

  /**
   * @return implementation contract address to parent contract
   */
  function _implementation() internal view virtual override returns (address) {
    return implementationAddr;
  }
}
