const express = require('express');
const palletService = require('../../../services/v1/pallet/pallet');

const authClientRequest = require('../../../middlewares/authGaurd');

let router = express.Router();

router.post('/', authClientRequest.authClientToken, palletService.createPallet);

router.post('/:palletNumber/purchase', authClientRequest.authClientToken, palletService.purchasePallet);

router.post('/:palletNumber/ship', authClientRequest.authClientToken, palletService.shipPallet);

router.post('/:palletNumber/receive', authClientRequest.authClientToken, palletService.receivePallet);

module.exports = router;
