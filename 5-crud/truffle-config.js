const fs = require('fs');
const HDWalletProvider = require("truffle-hdwallet-provider");
// that sucks ... a .env file is cleaner!
const secrets = JSON.parse(
  fs.readFileSync(".secrets").toString().trim()
);

module.exports = {
  networks: {
    ropsten: {
      provider: () =>
      // using my metamask wallet as provider
        new HDWalletProvider(
          secrets.seed,
          `https://ropsten.infura.io/v3/${secrets.projectId}`
        ),
      network_id: 3 
    }
  }
}
