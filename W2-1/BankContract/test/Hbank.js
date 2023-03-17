const { ethers } = require('hardhat')
const { expect } = require('chai')
require("@nomicfoundation/hardhat-chai-matchers")

describe('HBankTest', function () {
  let myContract
  let otherAddress

  //部署和初始化
  beforeEach(async function () {
    const MyContract = await ethers.getContractFactory('HBank')
    myContract = await MyContract.deploy()
    ;[_, otherAddress] = await ethers.getSigners()
  })

  it('Case1: 存款操作,存入金额1,查看金额1', async function () {
    await otherAddress.sendTransaction({
      to: myContract.address,
      value: ethers.utils.parseEther('1')
    })
    otherBalance = await myContract.connect(otherAddress).getMyBalance()
    expect(ethers.utils.formatEther(otherBalance)).to.equal('1.0')
  })

  it('Case2: 取款超过存款金额，不让取', async function () {
    await expect(
      myContract.connect(otherAddress).withdraw(2000)
    ).to.be.revertedWith('Insufficient balance')
  })

  it('Case3: 取掉所有款，查看余额为0', async function () {
    await myContract.connect(otherAddress).withdrawAll()
    otherBalance = await myContract.connect(otherAddress).getMyBalance()
    expect(ethers.utils.formatEther(otherBalance)).to.equal('0.0')
  })
})
