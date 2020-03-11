let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Pallet = new Schema({
    creator: {
        type: String,
        required : [ true, 'creator is required'],
        lowercase : true
    },
    palletNumber: {
        type: String,
        required : [ true, 'palletNumber is required'],
        unique : true,
        lowercase : true
    },
    createDateTime: {
        type: String,
        required : [ true, 'createDateTime is required']
    },
    productName: {
        type: String,
        required : [ true, 'productName is required']
    },
    productQuantity: {
        type: Number,
        required : [ true, 'productQuantity is required']
    },
    productQuantityUnit: {
        type: String,
        required : [ true, 'productQuantityUnit is required']
    },
    price: {
        type: Number,
        required : [ true, 'price is required']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Pallet', Pallet);
