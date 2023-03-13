require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require('hardhat-abi-exporter');

const {ProxyAgent,setGlobalDispatcher} =require("undici");
const proxyAgent=new ProxyAgent('http://127.0.0.1:7890');
setGlobalDispatcher(proxyAgent);
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks:{
    local:{
      url: "http://127.0.0.1:8545",
      chainId:31337,
      accounts:[process.env.PRIVATE_KEY]
    },
    goerli:{
      url: process.env.Goerli_PATH,
      chainId:5,
      accounts:[process.env.Goerli_KEY]
    },
  },
  etherscan: {
    apiKey:process.env.ETHERSCAN_API_KEY
  },
  abiExporter: {
    path: './abi',
    runOnCompile: true,
    clear: true,
    flat: true,
    spacing: 2,
    pretty: false,
  }
};
