const featuresModel = require("../models/features");
const helpers = require("../helpers/helpers");
const conn = require("../configs/db");

module.exports = {
  getData: (req, res) => {
    featuresModel
      .getData()
      .then(result => {
        helpers.response(res, result, 200);
      })
      .catch(err => {
        helpers.response(res, {}, res.status, err);
      });
  },
  insertData: (req, res) => {
    const { id_laundry, name, description, price, category } = req.body;

    const data = {
      id_laundry,
      name,
      description,
      price,
      category
    };
    featuresModel
      .insertData(data)
      .then(result => {
        const data = {
          id: result.insertID,
          id_laundry,
          name,
          description,
          price,
          category
        };
        helpers.response(res, data, 200);
      })
      .catch(err => {
        helpers.response(res, {}, 201, err);
      });
  },
  editData: (req, res) => {
    const id = req.query.id;
    const { id_laundry, name, description, price, category } = req.body;

    const data = {
      id_laundry,
      name,
      description,
      price,
      category
    };
    featuresModel
      .editData(id, data)
      .then(result => {
        const data = {
          id,
          id_laundry,
          name,
          description,
          price,
          category
        };
        helpers.response(res, data, 200);
      })
      .catch(err => {
        helpers.response(res, {}, 201, err);
        console.log(err);
      });
  },
  deleteData: (req, res) => {
    const id = req.query.id;

    featuresModel
      .deleteData(id)
      .then(result => {
        const data = {
          id
        };
        helpers.response(res, data, 200);
      })
      .catch(err => {
        helpers.response(res, {}, 201, err);
        console.log(err);
      });
  }
};
