const connection = require('../configs/db');

module.exports = {
    getOrderDetail: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM detail_orders", (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    insertOrderDetail: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO detail_orders SET ?", data, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    updateOrderDetail: (data, id) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE detail_orders SET ? WHERE id = ?", [data, id], (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    deleteOrderDetail: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM detail_orders WHERE id = ?", id, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
};