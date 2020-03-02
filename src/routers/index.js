const express = require('express');
const orders = require('./orders');
const laundry = require("./laundry");
const features = require("./features");
const orderdetails = require('./orderdetails');
const user = require('./user');
const Router = express.Router();

Router.use('/orders', orders);
Router.use('/orders/detail', orderdetails);
Router.use("/laundry", laundry);
Router.use("/features", features);
Router.use('/user', user);

module.exports = Router;