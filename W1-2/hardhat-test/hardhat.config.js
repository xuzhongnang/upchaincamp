require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require('hardhat-abi-exporter');

const proxyUrl = 'http://127.0.0.1:7890';   // change to yours, With the global proxy enabled, change the proxyUrl to your own proxy link. The port may be different for each client.
const { ProxyAgent, setGlobalDispatcher } = require("undici");
const proxyAgent = new ProxyAgent(proxyUrl);
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
    Goerli:{
      url: process.env.Goerli_PATH,
      chainId:5,
      accounts:[process.env.Goerli_KEY]
    },
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY
    }
  },
  abiExporter: {
    path: './data/abi',
    clear: true,
    flat: true,
    only: [':ERC20$'],
    spacing: 2
  }
};
