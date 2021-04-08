const { assert } = require("chai");

let contract,
  contractProxy,
  contractProxyAddress,
  ownerSigner,
  ownerAddr,
  otherSigner,
  otherAddr,
  token1,
  token2,
  token3;


describe('Proxy Wallet', () => {
  before(async () => {
    const ContractLogic = await ethers.getContractFactory('ContractLogic');
    let contractLogic = await ContractLogic.deploy();
    let contractLogicAddress = contractLogic.address;

    const ContractProxy = await ethers.getContractFactory('ContractProxy');
    contractProxy = await ContractProxy.deploy(contractLogicAddress);
    contractProxyAddress = contractProxy.address;

    contract = ContractLogic.attach(contractProxyAddress);

    ownerSigner = ethers.provider.getSigner(0);
    ownerAddr = await ownerSigner.getAddress();
  });
  describe('Multiple ERC20 tokens are sent to the contract', () => {
    beforeEach(async() => {
      const ERC20 = await ethers.getContractFactory('Token')
      token1 = await ERC20.deploy('tokenA', 'A', contractProxyAddress);
      token2 = await ERC20.deploy('tokenB', 'B', contractProxyAddress);
      token3 = await ERC20.deploy('tokenC', 'C', contractProxyAddress);
      await token1.deployed();
      await token2.deployed();
      await token3.deployed();

      otherSigner = ethers.provider.getSigner(1);
      otherAddr = await otherSigner.getAddress();
    });
    it('should contain a balance of 1000 for all 3 tokens', async() => {
      assert.equal((await token1.balanceOf(contractProxyAddress)).toNumber(), 1000);
      assert.equal((await token2.balanceOf(contractProxyAddress)).toNumber(), 1000);
      assert.equal((await token3.balanceOf(contractProxyAddress)).toNumber(), 1000);
    });
    it('should allow for transfers to another address', async() => {
      await contract.transfer(token1.address, contractProxyAddress, otherAddr, 500);
      assert.equal(await token1.balanceOf(contractProxyAddress), 500);
      assert.equal(await token1.balanceOf(otherAddr), 500);

      await contract.transfer(token2.address, contractProxyAddress, otherAddr, 500);
      assert.equal(await token2.balanceOf(contractProxyAddress), 500);
      assert.equal(await token2.balanceOf(otherAddr), 500);

      await contract.transfer(token3.address, contractProxyAddress, otherAddr, 500);
      assert.equal(await token3.balanceOf(contractProxyAddress), 500);
      assert.equal(await token3.balanceOf(otherAddr), 500);
    });
  });
});
