const express = require('express');
const orderController = require('../controllers/orders');
const Router = express.Router();

Router.get('/', orderController.getOrder)
.post('/', orderController.insertOrder)
.patch('/:id', orderController.updateOrder)
.delete('/:id', orderController.deleteOrder)

module.exports = Router;