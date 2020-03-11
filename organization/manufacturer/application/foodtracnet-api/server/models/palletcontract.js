const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const PalletContract = require('../../../../contract/lib/palletcontract.js');

// A wallet stores a collection of identities for use
//const wallet = new FileSystemWallet('../user/isabella/wallet');
const wallet = new FileSystemWallet('../../../../identity/user/willis/wallet');

const createPalletContract = async () => {

  const gateway = new Gateway();

  try {

      // Specify userName for network access
      const userName = 'User1@org1.example.com';

      // Load connection profile; will be used to locate a gateway
      let connectionProfile = yaml.safeLoad(fs.readFileSync('../../../../gateway/networkConnection.yaml', 'utf8'));

      // Set connection options; identity and wallet
      let connectionOptions = {
          identity: userName,
          wallet: wallet,
          discovery: { enabled:false, asLocalhost: true }
      };

      // Connect to gateway using application specified parameters
      console.log('Connect to Fabric gateway.');
      await gateway.connect(connectionProfile, connectionOptions);

      // Access FoodTracNet network
      console.log('Use network channel: mychannel.');
      const network = await gateway.getNetwork('mychannel');

      // Get addressability to pallet contract
      console.log('Use org.foodtracnet.productpallet smart contract.');
      const contract = await network.getContract('palletcontract');

      // Create Pallet
      console.log('Submit create pallet transaction.');

      // creator, palletNumber, createDateTime, productName, productQuantity, productQuantityUnit, price
      const createResponse = await contract.submitTransaction('create', 'username', '00001', '20200531', 'Envy Apples', '1000', 'KG', '3000');

      // process response
      console.log('Process issue transaction response.' + createResponse);
      let pallet = PalletContract.fromBuffer(createResponse);

      console.log(`${pallet.creator} Pallet : ${pallet.palletNumber} successfully created, priced at ${pallet.price}`);

      console.log('PalletCreate Transaction complete.');


  } catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);

    } finally {

        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();

    }

}

module.exports = {
    createPalletContract : createPalletContract
}
