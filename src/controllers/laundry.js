const laundryModel = require("../models/laundry");
const helpers = require("../helpers/helpers");
const conn = require("../configs/db");
const fs = require("fs");

module.exports = {
  insertData: (req, res) => {
    const { name, address, user_id, description, phone,minimum,open,close } = req.body;
    const date = new Date();
    const data = {
      name,
      address,
      user_id,
      description,
      phone,
      image: process.env.URL_IMG + `uploads/laundry/${req.file.filename}`,
      created_at: date,
      minimum,
      status:'Online',
      rating:0,
      open,
      close
    };
    laundryModel
      .insertData(data)
      .then(result => {
        const data = {
          id: result.insertId,
          name,
          address,
          user_id,
          description,
          phone,
          image: process.env.URL_IMG + `uploads/laundry/${req.file.filename}`,
          created_at: date,
          minimum,
      online:'Online',
      open,
      close
        };
        helpers.response(res, data, 200);
      })
      .catch(err => {
        helpers.response(res, {}, res.status, err);
      });
  },
  getData: (req, res) => {
    const page = req.query.page;
    !page
      ? laundryModel
          .getData()
          .then(result => {
            helpers.response(res, result, 200);
          })
          .catch(err => {
            helpers.response(res, {}, res.status, err);
          })
      : conn.query(
          "SELECT COUNT(*) as total FROM data_laundry",
          (err, result) => {
            const total = result[0].total;
            if (page > 0) {
              laundryModel
                .getPage(page, total)
                .then(result => {
                  helpers.response(res, result, 200);
                })
                .catch(err => {
                  helpers.response(res, {}, res.status, err);
                });
            }
          }
        );
  },

  deleteData: (req, res) => {
    const id = req.query.id;
    laundryModel
      .deleteData(id)
      .then(result => {
        data = {
          id
        };
        helpers.response(res, data, 200);
      })
      .catch(err => {
        helpers.response(res, {}, res.status, err);
      });
  },

  deleteData: (req, res) => {
    const id = req.query.id;
    laundryModel
      .deleteData(id)
      .then(result => {
        data = {
          id
        };
        helpers.response(res, data, 200);
      })
      .catch(err => {
        helpers.response(res, {}, res.status, err);
      });
  },

  editData: (req, res) => {
    const id = req.query.id;
    const { name, address, user_id, description, phone,minimum,open,close } = req.body;
    if (!req.file) {
      const data = {
        name,
        address,
        user_id,
        description,
        phone,
        minimum,
        open,
        close
      };
      conn.query(
        "SELECT * FROM data_laundry where id =?",
        id,
        (err, result) => {
          if (!err) {
            if (result.length > 0) {
              process.env.URL = result[0].image;
              laundryModel
                .editData(id, data)
                .then(result => {
                  const data = {
                    id,
                    name,
                    address,
                    user_id,
                    description,
                    phone,
                    image: process.env.URL,
                    minimum,
                    open,
                    close
                  };
                  helpers.response(res, data, 200);
                })
                .catch(err => {
                  helpers.response(res, {}, 201, err);
                  console.log(err);
                });
            } else {
              res.send("Eror!");
            }
          }
        }
      );
    } else {
      const data = {
        name,
        address,
        user_id,
        description,
        phone,
        image: process.env.URL_IMG + `uploads/laundry/${req.file.filename}`,
        minimum,
        open,
        close
      };
      conn.query(
        "SELECT * FROM data_laundry where id =?",
        id,
        (err, result) => {
          if (!err) {
            if (result.length > 0) {
              process.env.URL = result[0].image;
              laundryModel
                .editData(id, data)
                .then(result => {
                  const data = {
                    id,
                    name,
                    address,
                    user_id,
                    description,
                    phone,
                    image:
                      process.env.URL_IMG +
                      `uploads/laundry/${req.file.filename}`,
                      minimum,
                      open,
                      close
                  };
                  helpers.response(res, data, 200);
                  const img = process.env.URL.replace(process.env.URL_IMG, "");
                  fs.unlink(img, err => {
                    if (err) {
                      return;
                    }
                  });
                  process.env.URL = "";
                })
                .catch(err => {
                  helpers.response(res, {}, 201, err);
                });
            } else {
              res.send("Eror!");
            }
          }
        }
      );
    }
  },

  filterData: (req, res) => {
    const q = req.query.q;
    laundryModel
      .filterData(q)
      .then(result => {
        helpers.response(res, result, 200);
      })
      .catch(err => {
        helpers.response(res, {}, res.status, err);
      });
  },
  joinData: (req, res) => {
    const id = req.query.id;
    laundryModel
      .joinData(id)
      .then(result => {
        helpers.response(res, result, 200);
      })
      .catch(err => {
        helpers.response(res, {}, res.status, err);
      });
  },
  status:(req,res)=>{
    const id =req.query.id
    const online=req.body.status
    const data={
      online
    }
    laundryModel.status(id,status)
    .then(result => {
      data={
        id,
        online
      }
      helpers.response(res, data, 200);
    })
    .catch(err => {
      helpers.response(res, {}, res.status, err);
    });  
  },

  getDetail:(req,res)=>{
    const id =req.query.id
    
    laundryModel.getDetail(id)
    .then(result => {
      helpers.response(res, result, 200);
    })
    .catch(err => {
      helpers.response(res, {}, 201, err);
    });  }
};
