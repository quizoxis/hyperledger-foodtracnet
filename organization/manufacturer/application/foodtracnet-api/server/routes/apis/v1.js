const userController = require('../../controllers/apis/v1/users');
const authController = require('../../controllers/apis/v1/auth');
const palletController = require('../../controllers/apis/v1/pallet');

const express = require('express');
let router = express.Router();

router.use('/users', userController);
router.use('/auth', authController);
router.use('/pallet', palletController);

module.exports = router;
