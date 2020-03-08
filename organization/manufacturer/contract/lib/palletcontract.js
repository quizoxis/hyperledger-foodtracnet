/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');

// FoodTracNet specifc classes
const FoodPallet = require('./pallet.js');
const FoodPalletList = require('./palletlist.js');

/**
 * A custom context provides easy access to list of all food papers
 */
class PalletContext extends Context {

    constructor() {
        super();
        // All pallets are held in a list
        this.palletList = new PalletList(this);
    }
}

/*
 * PalletContract
*/
class PalletContract extends Contract {

  constructor() {
    super('org.foodtracnet.pallet');

  }
  createContext() {
    return new PalletContext();
  }

  /**
  * Instantiate: ledger setup
  */
  async instantiate(ctx) {
    console.log('Instantiating pallet contract');
  }

  async create(ctx, issuer, palletNumber, createDateTime, priceValue) {

    // create pallet
    let pallet = FoodPallet.createInstance(issuer, palletNumber, createDateTime, priceValue);

    // Change Pallet state to Created
    pallet.setCreated();

    // Set the creator of pallet
    pallet.setOwner(issuer);

    // Add newly created pallet to the list
    await ctx.palletList.addPallet(pallet);

    return pallet;
  }


}
