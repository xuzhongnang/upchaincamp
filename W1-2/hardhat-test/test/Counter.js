const { ethers } = require('hardhat')
const { expect } = require('chai')

describe('Calculator', function () {
    let myContract
    let otherAddress
  
    //部署和初始化
    beforeEach(async function () {
      const MyContract = await ethers.getContractFactory('Calculator')
      myContract = await MyContract.deploy()
      await myContract.add(10)
      ;[_, otherAddress] = await ethers.getSigners()
    })
  
    it('Case1: 部署合约的地址可以调用 count 方法', async function () {
      const count = await myContract.count()
      expect(count).to.equal(10)
    })
  
    it('Case2: 非部署合约的地址无法调用 count 方法', async function () {
      // 使用其他地址来调用合约方法，应该会抛出异常
      await expect(myContract.connect(otherAddress).count()).to.be.revertedWith(
        'this function is restricted to the owne'
      )
    })
  
})
