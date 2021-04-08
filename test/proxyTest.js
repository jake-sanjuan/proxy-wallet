const { assert } = require('chai');

const LOGIC_ADDRESS = '0x605C9B6f969A27982Fe1Be16e3a24F6720A14beD';

let proxy, proxyAddr, owner, ownerAddr, s1;

describe('Proxy', () => {
  before(async () => {
    const Proxy = await ethers.getContractFactory('ContractProxy');
    proxy = await Proxy.deploy(LOGIC_ADDRESS);
    await proxy.deployed();

    owner = ethers.provider.getSigner(0);
    ownerAddr = await owner.getAddress();

    s1 = ethers.provider.getSigner(1);
  });
  it('should have the correct address stored as the implementation', async() => {
    assert.equal(await proxy.getImplementation(), LOGIC_ADDRESS);
  });
  it('should allow us to view the owner address', async() => {
    assert.equal(await proxy.owner(), ownerAddr);
  });

  describe('When ether is deposited', () => {
    before(() => {
      proxyAddr = proxy.address;
    });
    it('should be rejected from the owner', async() => {
      let ex;
      try {
        await owner.sendTransaction({
          to: proxyAddr,
          values: ethers.utils.parseEther('1.0'),
        });
      } catch (_ex) {
        ex = _ex;
      }
      assert(ex, "Transaction should've reverted");
    });
    it('should be rejected by anyone else', async() => {
      let ex;
      try {
        await s1.sendTransaction({
          to: proxyAddr,
          value: ethers.utils.parseEther('1.0')
        });
      } catch (_ex) {
        ex = _ex;
      }
      assert(ex, 'Should have reverted');
    });
  });

  describe('When the fallback function is invoked', () => {
    it('should run when the owner makes the call', async () => {
      let ex;
      try {
        await owner.sendTransaction({
          to: proxyAddr,
          data: '0x321d2bd630ef856c8c1432aa7517adac9cd3cc43c93dc73a482ee9bcf84bb509'
        });
      } catch (_ex) {
        ex = _ex;
      }
      assert(!ex, "Transaction should've run!");
    });
    it('should not run when someone else makes the call', async() => {
      let ex;
      try {
        await s1.sendTransaction({
          to: proxyAddr,
          data: '0x321d2bd630ef856c8c1432aa7517adac9cd3cc43c93dc73a482ee9bcf84bb509'
        });
      } catch (_ex) {
        ex = _ex;
      }
      assert(ex, 'Transaction should have reverted!');
    });
  });
});
