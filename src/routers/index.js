const express = require('express');
const orders = require('./orders');
const orderdetails = require('./orderdetails');
const Router = express.Router();

Router.use('/orders', orders);
Router.use('/orders/detail', orderdetails);

module.exports = Router;