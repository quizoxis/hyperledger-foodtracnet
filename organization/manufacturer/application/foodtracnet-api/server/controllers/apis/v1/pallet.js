const express = require('express');
const palletService = require('../../../services/v1/pallet/pallet');

const authClientRequest = require('../../../middlewares/authGaurd');

let router = express.Router();

router.post('/', authClientRequest.authClientToken, palletService.createPallet);

module.exports = router;
