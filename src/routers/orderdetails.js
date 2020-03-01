const express = require('express');
const orderDetailController = require('../controllers/orderdetails');
const Router = express.Router();

Router.get('/', orderDetailController.getOrderDetail)
.post('/', orderDetailController.insertOrderDetail)
.patch('/:id', orderDetailController.updateOrderDetail)
.delete('/:id', orderDetailController.deleteOrderDetail)

module.exports = Router;