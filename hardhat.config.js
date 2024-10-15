require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    arbitrum: {
      url: process.env.ARBITRUM_RPC_URL,  // RPC URL for Arbitrum (defined in .env)
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Your wallet private key (defined in .env)
      chainId: 42161, // Arbitrum One chain ID
    },
    arbitrumGoerli: {
      url: process.env.ARBITRUM_GOERLI_RPC_URL,  // Arbitrum Goerli testnet URL (defined in .env)
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Your wallet private key (defined in .env)
      chainId: 421613, // Arbitrum Goerli chain ID
    }
  }
};
