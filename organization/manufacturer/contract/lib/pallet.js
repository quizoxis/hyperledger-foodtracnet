creator/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for ledger state
const State = require('./../ledger-api/state.js');

// Enumerate product pallet state values
const fpState = {
    CREATED: 1,
    PURCHASED: 2,
    SHIPPED: 3,
    RECEIVED: 4
};

/**
 * ProductPallet class extends State class
 * Class will be used by application and smart contract to define a pallet
 */
class ProductPallet extends State {

    constructor(obj) {
        super(ProductPallet.getClass(), [obj.creator, obj.palletNumber]);
        Object.assign(this, obj);
    }

    /**
     * Basic getters and setters
    */
    getCreator() {
        return this.creator;
    }

    setCreator(newCreator) {
        this.creator = newCreator;
    }

    getOwner() {
        return this.owner;
    }

    setOwner(newOwner) {
        this.owner = newOwner;
    }

    /**
     * Useful methods to encapsulate pallet states
     */
    setCreated() {
        this.currentState = fpState.CREATED;
    }
    setPurchased() {
      this.currentState = fpState.PURCHASED;
    }

    setShipped() {
        this.currentState = fpState.SHIPPED;
    }

    setReceived() {
      this.currentState = fpState.RECEIVED;
    }

    setProductName(sProductName) {
      this.productName = sProductName;
    }

    setProductQuantity(sProductQuantity) {
      this.productQuantity = sProductQuantity;
    }

    setCreateDateTime(sDateTime) {
      this.createDateTime = sDateTime;
    }

    setPurchaseDateTime(sDateTime){
      this.purchaseDateTime = sDateTime;
    }

    setShipDateTime(sDateTime){
      this.shipDateTime = sDateTime;
    }

    setReceivedDateTime(sDateTime){
      this.receivedDateTime = sDateTime;
    }

    isCreated() {
        return this.currentState === fpState.CREATED;
    }

    isPurchased() {
      return this.currentState === fpState.PURCHASED;
    }

    isShipped() {
        return this.currentState === fpState.SHIPPED;
    }

    isReceived() {
        return this.currentState === fpState.RECEIVED;
    }

    static fromBuffer(buffer) {
        return ProductPallet.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to product pallet
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, ProductPallet);
    }

    /**
     * Factory method to create a pallet object
     */
    static createInstance(creator, palletNumber, createDateTime, productName, productQuantity, price) {
        return new ProductPallet({ creator, palletNumber, createDateTime, productName, productQuantity, productQuantityUnit, price});
    }

    static getClass() {
        return 'org.foodtracnet.productpallet';
    }
}

module.exports = ProductPallet;
