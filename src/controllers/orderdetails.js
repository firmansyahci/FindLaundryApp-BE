const orderDetailModel = require('../models/orderdetails');
const miscHelper = require('../helpers/helpers');
const bodyParser = require('body-parser');

module.exports = {
    getOrderDetail: (req, res) => {
        orderDetailModel.getOrderDetail()
            .then((result) => {
                miscHelper.response(res, result, 200);
            })
            .catch(err => console.log(err));
    },
    insertOrderDetail: (req, res) => {
        const { id_orders, id_features, description, qty, price } = req.body;
        const data = {
            id_orders,
            id_features,
            description,
            qty,
            price,
        };
        orderDetailModel.insertOrderDetail(data)
            .then((result) => {
                const dataResponse = { id: result.insertId, ...data }
                miscHelper.response(res, dataResponse, 201);
            })
            .catch(err => console.log(err));
    },
    updateOrderDetail: (req, res) => {
        const { id_orders, id_features, description, qty, price } = req.body;
        const data = {
            id_orders,
            id_features,
            description,
            qty,
            price,
        };
        const id = req.params.id;
        orderDetailModel.updateOrderDetail(data, id)
            .then((result) => {
                const dataResponse = {id, ...data}
                miscHelper.response(res, dataResponse, 200);
            })
            .catch(err => console.log(err));
    },
    deleteOrderDetail: (req, res) => {
        const id = req.params.id;
        orderDetailModel.deleteOrderDetail(id)
            .then((result) => {
                miscHelper.response(res, id, 200);
            })
            .catch(err => console.log(err));
    },
};