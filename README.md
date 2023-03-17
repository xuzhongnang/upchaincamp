# upchaincamp

# 问题收集
 ### 1. hardhat出现验证超时问题，Reason: request to https://api-goerli.etherscan.io/api failed, reason: read ECONNRESET
   - a. 使用 npm install --save-dev @nomiclabs/hardhat-etherscan
   - b. 在hardhat.config.js里加入require("@nomiclabs/hardhat-etherscan");
   - 有时因为代理问题，还要在里面加上这段
    ```javascript
    const {ProxyAgent,setGlobalDispatcher} =require("undici");
    const proxyAgent=new ProxyAgent('http://127.0.0.1:7890');
    setGlobalDispatcher(proxyAgent);
    ```
 ### 2. hardhat执行测试用例时使用到to.be.revertedWith，报Error: Invalid Chai property: revertedWith
   - a. npm add --dev @nomicfoundation/hardhat-chai-matchers
   - b. 在测试文件里加入require("@nomicfoundation/hardhat-chai-matchers")