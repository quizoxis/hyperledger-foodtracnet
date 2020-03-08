/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for collections of ledger states --  a state list
const StateList = require('./../ledger-api/statelist.js');

const FoodPallet = require('./pallet.js');

class PalletList extends StateList {

    constructor(ctx) {
        super(ctx, 'org.foodtracnet.foodpalletlist');
        this.use(FoodPallet);
    }

    async addPallet(pallet) {
        return this.addState(pallet);
    }

    async getPallet(palletKey) {
        return this.getState(palletKey);
    }

    async updatePallet(pallet) {
        return this.updateState(pallet);
    }
}


module.exports = PalletList;
