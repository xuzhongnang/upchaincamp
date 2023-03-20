const { ethers } = require('hardhat')
const { expect } = require('chai')
require('@nomicfoundation/hardhat-toolbox')

describe('TeacherScoreTest', function () {
  let scoreContract
  let teacherContract
  let student1Address

  //部署和初始化
  beforeEach(async function () {
    const ScoreContract = await ethers.getContractFactory('Score')
    scoreContract = await ScoreContract.deploy()
    scoreContract.deployed()
    const TeacherContract = await ethers.getContractFactory('Teacher')
    teacherContract = await TeacherContract.deploy(scoreContract.address)
    teacherContract.deployed()
    scoreContract.setTeacher(teacherContract.address)
    ;[_, student1Address] = await ethers.getSigners()
  })

  it('Case1:非老师调用添加和修改学生分数报身份错误', async function () {
    await expect(
      scoreContract
        .connect(student1Address)
        .setScore(student1Address.address, 100)
    ).to.be.revertedWithCustomError(scoreContract, 'NotTeacher')
  })
  it('Case2:老师设置学生分数', async function () {
    await teacherContract.setStudentScores(student1Address.address, 100);
    const studentScore = await teacherContract.getStudentScore(student1Address.address);
    expect(
      studentScore
    ).to.equal(100);
  })
  it('Case3:不能设置学生分数超过100分', async function () {
    await  expect(
      teacherContract.setStudentScores(student1Address.address, 101)
    ).to.be.revertedWithCustomError(scoreContract, 'ScoreNotThan100')
  })
})
