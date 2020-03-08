/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for ledger state
const State = require('./../ledger-api/state.js');

// Enumerate food pallet state values
const fpState = {
    CREATED: 1,
    READYTOSHIP: 2,
    SHIPPED: 3,
    DELIVERED: 4
};

/**
 * FoodPallet class extends State class
 * Class will be used by application and smart contract to define a pallet
 */
class FoodPallet extends State {

    constructor(obj) {
        super(FoodPallet.getClass(), [obj.issuer, obj.palletNumber]);
        Object.assign(this, obj);
    }

    /**
     * Basic getters and setters
    */
    getIssuer() {
        return this.issuer;
    }

    setIssuer(newIssuer) {
        this.issuer = newIssuer;
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

    setReadToShip() {
        this.currentState = fpState.READYTOSHIP;
    }

    setShipped() {
        this.currentState = fpState.SHIPPED;
    }

    setDelivered() {
      this.currentState = fpState.DELIVERED;
    }

    isCreated() {
        return this.currentState === fpState.CREATED;
    }

    isReadToShip() {
        return this.currentState === fpState.READYTOSHIP;
    }

    isShipped() {
        return this.currentState === fpState.Shipped;
    }

    isDelivered() {
        return this.currentState === fpState.DELIVERED;
    }

    static fromBuffer(buffer) {
        return FoodPallet.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to food pallet
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, FoodPallet);
    }

    /**
     * Factory method to create a food pallet object
     */
    static createInstance(issuer, palletNumber, createDateTime, priceValue) {
        return new FoodPallet({ issuer, palletNumber, createDateTime, priceValue });
    }

    static getClass() {
        return 'org.foodtracnet.pallet';
    }
}

module.exports = FoodPallet;
