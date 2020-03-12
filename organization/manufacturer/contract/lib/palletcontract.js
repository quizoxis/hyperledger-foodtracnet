/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');

// FoodTracNet specifc classes
const ProductPallet = require('./pallet.js');
const ProductPalletList = require('./palletlist.js');

/**
 * A custom context provides easy access to list of all product pallets
 */
class ProductPalletContext extends Context {

    constructor() {
        super();
        // All pallets are held in a list
        this.palletList = new PalletList(this);
    }
}

/*
 * ProductPalletContract
*/
class ProductPalletContract extends Contract {

  constructor() {
    super('org.foodtracnet.productpallet');

  }
  createContext() {
    return new ProductPalletContext();
  }

  /**
   * Instantiate: ledger setup
   * @param {Context} ctx the transaction context
   */
  async instantiate(ctx) {
    console.log('Instantiating pallet contract');
  }

  /**
   * Create Pallet
   *
   * @param {Context} ctx the transaction context
   * @param {String} creator pallet creator
   * @param {Integer} palletNumber pallet number for this creator
   * @param {String} createDateTime pallet creation date
   * @param {String} productName Name of the product loaded on pallet
   * @param {Integer} productQuantity Quantity of product
   * @param {String} productQuantityUnit Unit of quantity i.e. item,kg,tonnes
   * @param {Integer} price price of pallet
  */
  async create(ctx, creator, palletNumber, createDateTime, productName, productQuantity, productQuantityUnit, price) {

    // create pallet
    let pallet = ProductPallet.createInstance(creator, palletNumber, createDateTime, productName, productQuantity, productQuantityUnit, price);

    // Change Pallet state to Created(1)
    pallet.setCreated();

    // Set the creator of pallet
    pallet.setOwner(creator);

    // Set the create date time
    pallet.setCreateDateTime(createDateTime);

    // Set the product name and quantity
    pallet.setProductName(productName);
    pallet.setProductQuantity(productQuantity);

    // Add newly created pallet to the list
    await ctx.palletList.addPallet(pallet);

    return pallet;
  }
  /**
   * Purchase Pallet
   *
   * @param {Context} ctx the transaction context
   * @param {String} creator pallet creator
   * @param {Integer} palletNumber pallet number for this creator
   * @param {String} currentOwner pallet current owner
   * @param {String} newOwner Name of new owner
   * @param {Integer} price price of pallet
   * @param {String} purchaseDateTime time pallet was purchased
  */
  async purchase(ctx, creator, palletNumber, currentOwner, newOwner, price, purchaseDateTime) {

    // lookup pallet key
    let palletKey = ProductPallet.makeKey([creator, palletNumber]);

    let pallet = await ctx.palletList.getPallet(palletKey);

    // Validate the owner
    if (pallet.getOwner() !== currentOwner) {
      throw new Error('Pallet ' + creator + palletNumber + ' is not owned by ' + currentOwner);
    }
    // purchase of pallet changes state from CREATED(1) to PURCHASED(2)
    if (pallet.isCreated()) {
      pallet.setPurchaseDateTime(purchaseDateTime);
      pallet.setPurchased();
    }

    // Check if pallet is already purchased
    if (pallet.isPurchased()) {
        pallet.setOwner(newOwner);
    } else {
        throw new Error('Pallet ' + creator + palletNumber + ' is not purchased. Current state = ' + pallet.getCurrentState());
    }

    // Update the pallet
    await ctx.palletlist.updatePallet(pallet);
    return pallet;

  }

  /**
   * Ship Pallet
   *
   * @param {Context} ctx the transaction context
   * @param {String} creator pallet creator
   * @param {Integer} palletNumber pallet number for this creator
   * @param {String} currentOwner current owner of pallet
   * @param {Integer} shipDateTime Datetime pallet was shipped
  */
  async ship(ctx, creator, palletNumber, currentOwner, shipDateTime) {

    // lookup pallet key
    let palletKey = ProductPallet.makeKey([creator, palletNumber]);

    let pallet = await ctx.palletList.getPallet(palletKey);

    // Validate the owner
    if (pallet.getOwner() !== currentOwner) {
      throw new Error('Pallet ' + creator + palletNumber + ' is not owned by ' + currentOwner);
    }

    // Change State of pallet
    // Move state from PURCHASED to SHIPPED
    if (pallet.isPurchased()) {
      pallet.setShipDateTime(shipDateTime);
      pallet.setShipped();
    } else {
      throw new Error('Pallet ' + creator + palletNumber + 'is not in PURCHASED state. Current state = ' + pallet.getCurrentState());
    }

    // Update the pallet
    await ctx.palletList.updatePallet(pallet);
    return pallet;
  }
  /**
   * Receive Pallet
   *
   * @param {Context} ctx the transaction context
   * @param {String} creator pallet creator
   * @param {Integer} palletNumber pallet number for this creator
   * @param {String} receivingOwner current owner of pallet
   * @param {Integer} receivedDateTime Datetime pallet was shipped
  */
  async receive(ctx, creator, palletNumber, receivingOwner, receivedDateTime) {

    // lookup pallet key
    let palletKey = ProductPallet.makeKey([creator, palletNumber]);

    let pallet = await ctx.palletList.getPallet(palletKey);

    // Check pallet is not RECEIVED
    if (pallet.isReceived()) {
      throw new Error('Pallet ' + creator + palletNumber + ' already received');
    }

    // Verify that the receiver owns the pallet before receiving it
    if (pallet.getOwner() === receivingOwner) {
        pallet.setReceivedDateTime(receivedDateTime);
        pallet.setReceived();
    } else {
        throw new Error('Receiving owner does not own pallet ' + creator + palletNumber);
    }

    await ctx.palletList.updatePallet(pallet);
    return pallet;

  }

}

module.exports = ProductPalletContract;
