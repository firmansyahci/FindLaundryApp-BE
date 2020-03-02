const connection = require("../configs/db");

module.exports = {
  getData: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM features_laundry", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  insertData: data => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO features_laundry SET ?",
        data,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  editData: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE features_laundry SET ? WHERE id = ?",
        [data, id],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  deleteData: id => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM features_laundry WHERE id = ?",
        id,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  }
};
