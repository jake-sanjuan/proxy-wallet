# Proxy Wallet

This set of contracts is meant to be a simple ERC20 wallet for Ethereum users.  This wallet consists of a proxy contract that holds the balances delegating logic out to a different contract (`ContractLogic.sol`) for sending tokens.  It cannot receive Ethereum at this time, although that functionality can easily be changed.  This wallet can only be used by the person that deploys it, unless the individual decides to give up ownership via the `renounceOwnership()` or `transferOwnership()` functions inherited from `Ownable.sol`.

The test cases in this contract only cover the transferring of ERC20 tokens, and do not test for the ownership functionality of the proxy.  This is due to the fact that in the test cases, the abi of `ContractLogic.sol` is fed to the proxy contracts address.  From what I understand, this gives the proxy contract the functionality to actually act as a proxy using the logic contracts abi, at the expense of the proxy contract's own abi being overwritten. This problem only occurs in the test cases however, when tested on [Remix IDE](https://remix.ethereum.org/), the `onlyOwner` modifier worked on both the `fallback()` and `receive()` functions, and `getImplementation()` returned the correct address.


