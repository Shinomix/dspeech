/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "hardhat",
  networks: {
     hardhat: {
      allowUnlimitedContractSize: true,
      chainId: 31337
     },
     rinkeby: {
        url: API_URL,
        accounts: [`0x${PRIVATE_KEY}`]
     }
  },
};
