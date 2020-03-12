const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const PalletContract = require('../../../../contract/lib/palletcontract.js');

// A wallet stores a collection of identities for use
//const wallet = new FileSystemWallet('../user/isabella/wallet');
const wallet = new FileSystemWallet('../../../../identity/user/willis/wallet');

const createPalletContract = async (creator, palletNumber, createDateTime, productName, productQuantity, productQuantityUnit, price) => {

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

      // create - creator, palletNumber, createDateTime, productName, productQuantity, productQuantityUnit, price
      const contractResponse = await contract.submitTransaction('create', userName, palletNumber, createDateTime, productName, productQuantity, productQuantityUnit, price);

      // process response
      console.log('Process issue transaction response.' + contractResponse);
      let pallet = PalletContract.fromBuffer(contractResponse);

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

const purchasePalletContract = async (creator, palletNumber, currentOwner, newOwner, price, purchaseDateTime) => {

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

      // purchase -  creator, palletNumber, currentOwner, newOwner, price, purchaseDateTime
      const contractResponse = await contract.submitTransaction('purchase', userName, palletNumber, currentOwner, newOwner, price, purchaseDateTime);

      // process response
      console.log('Process issue transaction response.' + contractResponse);
      let pallet = PalletContract.fromBuffer(contractResponse);

      console.log(`${pallet.creator} Pallet : ${pallet.palletNumber} Pallet Purchase successfull, priced at ${pallet.price}`);

      console.log('PalletPurchase Transaction complete.');


  } catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);

    } finally {

        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();

    }

}

// ship(ctx, creator, palletNumber, currentOwner, shipDateTime) {
const shipPalletContract = async (creator, palletNumber, currentOwner, shipDateTime) => {

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

      // ship -  creator, palletNumber, currentOwner, shipDateTime
      const contractResponse = await contract.submitTransaction('ship', creator, palletNumber, currentOwner, shipDateTime);

      // process response
      console.log('Process issue transaction response.' + contractResponse);
      let pallet = PalletContract.fromBuffer(contractResponse);

      console.log(`${pallet.creator} Pallet : ${pallet.palletNumber} Pallet ship successfull, priced at ${pallet.price}`);

      console.log('PalletShip Transaction complete.');


  } catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);

    } finally {

        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();

    }

}
// receive(ctx, creator, palletNumber, receivingOwner, receivedDateTime)
const receivePalletContract = async (creator, palletNumber, receivingOwner, receivedDateTime) => {

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

      // receive -  creator, palletNumber, receivingOwner, receivedDateTime
      const contractResponse = await contract.submitTransaction('receive', creator, palletNumber, receivingOwner, receivedDateTime);

      // process response
      console.log('Process issue transaction response.' + contractResponse);
      let pallet = PalletContract.fromBuffer(contractResponse);

      console.log(`${pallet.creator} Pallet : ${pallet.palletNumber} Pallet receive successfull, priced at ${pallet.price}`);

      console.log('PalletShip Transaction complete.');


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
    createPalletContract : createPalletContract,
    purchasePalletContract: purchasePalletContract,
    shipPalletContract: shipPalletContract,
    receivePalletContract: receivePalletContract
}
