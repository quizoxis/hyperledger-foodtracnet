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
            price
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

        const temp = {
              creator: "Willis",
              createDateTime: "20200110153022",
              palletNumber: palletNumber,
              productName: productName,
              productQuantity: productQuantity,
              productQuantityUnit: productQuantityUnit,
              price: price
          }

        let newPallet = await palletModel.create(temp);

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

module.exports = {
    createPallet : createPallet
}
