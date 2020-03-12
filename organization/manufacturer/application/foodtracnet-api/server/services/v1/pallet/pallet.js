const express = require('express');
const palletModel = require('../../../models/pallet');
const palletContract = require('../../../models/palletcontract');

const createPallet = async (req, res, next) => {

  try {

        const {
            palletNumber,
            productName,
            productQuantity,
            productQuantityUnit,
            price,
            creator,
            createDateTime
        } = req.body;

        if (palletNumber == undefined || palletNumber === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'palletNumber is required',
                'field': 'palletNumber'
            });
        }

        if (productName == undefined || productName === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'productName is required',
                'field': 'productName'
            });
        }
        if (productQuantity  == undefined || productQuantity === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'productQuantity is required',
                'field': 'productQuantity'
            });
        }
        if (productQuantityUnit == undefined || productQuantityUnit === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'productQuantityUnit is required',
                'field': 'productQuantityUnit'
            });
        }
        if (price == undefined || price === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'price is required',
                'field': 'price'
            });
        }

        if (creator  == undefined || creator === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'creator is required',
                'field': 'creator'
            });
        }

        if (createDateTime  == undefined || createDateTime === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'createDateTime is required',
                'field': 'createDateTime'
            });
        }


        let newPallet = await createPalletContract(creator, palletNumber, createDateTime, productName, productQuantity, productQuantityUnit, price);

          if (newPallet) {
              return res.status(201).json({
                  'message': 'Pallet created',
                  'data': newPallet
              });
          } else {
              throw new Error('Opps! something went worng');
          }

      } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again',
            'error': error.message
        });
    }

}

// purchase(creator, palletNumber, currentOwner, newOwner, price, purchaseDateTime)
const purchasePallet = async (req, res, next) => {
  try {

        const {
            creator,
            palletNumber,
            currentOwner,
            newOwner,
            price,
            purchaseDateTime
        } = req.body;

        if (palletNumber == undefined || palletNumber === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'palletNumber is required',
                'field': 'palletNumber'
            });
        }

        if (newOwner  == undefined || newOwner === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'newOwner is required',
                'field': 'newOwner'
            });
        }
        if (price == undefined || price === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'price is required',
                'field': 'price'
            });
        }

        if (creator  == undefined || creator === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'creator is required',
                'field': 'creator'
            });
        }
        if (currentOwner  == undefined || currentOwner === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'currentOwner is required',
                'field': 'currentOwner'
            });
        }


        if (purchaseDateTime  == undefined || purchaseDateTime === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'purchaseDateTime is required',
                'field': 'purchaseDateTime'
            });
        }

        let purchasePallet = await purchasePalletContract(creator, palletNumber, currentOwner, newOwner, price, purchaseDateTime);

        if (purchasePallet) {
            return res.status(201).json({
                'message': 'Pallet purchase completed',
                'data': purchasedPallet
            });
        } else {
            throw new Error('Opps! something went worng');
        }


      } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again',
            'error': error.message
        });
    }

}

// ship(creator, palletNumber, currentOwner, shipDateTime)
const shipPallet = async (req, res, next) => {
  try {

        const {
            creator,
            palletNumber,
            currentOwner,
            shipDateTime
        } = req.body;

        if (creator  == undefined || creator === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'creator is required',
                'field': 'creator'
            });
        }

        if (palletNumber == undefined || palletNumber === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'palletNumber is required',
                'field': 'palletNumber'
            });
        }

        if (currentOwner  == undefined || currentOwner === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'currentOwner is required',
                'field': 'currentOwner'
            });
        }


        if (shipDateTime  == undefined || shipDateTime === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'shipDateTime is required',
                'field': 'shipDateTime'
            });
        }

        // ship(creator, palletNumber, currentOwner, shipDateTime)
        let shipPallet = await shipPalletContract(creator, palletNumber, currentOwner, shipDateTime);

        if (shipPallet) {
            return res.status(201).json({
                'message': 'Pallet ship completed',
                'data': shipPallet
            });
        } else {
            throw new Error('Opps! something went worng');
        }


      } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again',
            'error': error.message
        });
    }

}
// receive (creator, palletNumber, receivingOwner, receivedDateTime)
const receivePallet = async (req, res, next) => {
  try {

        const {
            creator,
            palletNumber,
            receivingOwner,
            receivedDateTime
        } = req.body;

        if (palletNumber == undefined || palletNumber === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'palletNumber is required',
                'field': 'palletNumber'
            });
        }


        if (receivingOwner  == undefined || receivingOwner === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'receivingOwner is required',
                'field': 'receivingOwner'
            });
        }


        if (receivedDateTime  == undefined || receivedDateTime === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'receivedDateTime is required',
                'field': 'receivedDateTime'
            });
        }

        // receivePalletContract (creator, palletNumber, receivingOwner, receivedDateTime)
        let receivePallet = await receivePalletContract(creator, palletNumber, receivingOwner, receivedDateTime);

        if (receivePallet) {
            return res.status(201).json({
                'message': 'Pallet receive completed',
                'data': shipPallet
            });
        } else {
            throw new Error('Opps! something went worng');
        }


      } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again',
            'error': error.message
        });
    }

}

module.exports = {
    createPallet : createPallet,
    purchasePallet: purchasePallet,
    shipPallet: shipPallet,
    receivePallet: receivePallet
}
