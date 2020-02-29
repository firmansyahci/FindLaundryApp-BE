const orderModel = require('../models/orders');
const miscHelper = require('../helpers/helpers');
const bodyParser = require('body-parser');

module.exports = {
    getOrder: (req, res) => {
        orderModel.getOrder()
            .then((result) => {
                miscHelper.response(res, result, 200);
            })
            .catch(err => console.log(err));
    },
    insertOrder: (req, res) => {
        const { user_id, laundry_id, date, price, status, date_done } = req.body;
        const data = {
            user_id,
            laundry_id,
            date,
            price,
            status,
            date_done,
        };
        orderModel.insertOrder(data)
            .then((result) => {
                const dataResponse = { id: result.insertId, ...data }
                miscHelper.response(res, dataResponse, 201);
            })
            .catch(err => console.log(err));
    },
    updateOrder: (req, res) => {
        const { user_id, laundry_id, date, price, status, date_done } = req.body;
        const data = {
            user_id,
            laundry_id,
            date,
            price,
            status,
            date_done,
        };
        const id = req.params.id;
        orderModel.updateOrder(data, id)
            .then((result) => {
                const dataResponse = {id, ...data}
                miscHelper.response(res, dataResponse, 200);
            })
            .catch(err => console.log(err));
    },
    deleteOrder: (req, res) => {
        const id = req.params.id;
        orderModel.deleteOrder(id)
            .then((result) => {
                miscHelper.response(res, id, 200);
            })
            .catch(err => console.log(err));
    },
};