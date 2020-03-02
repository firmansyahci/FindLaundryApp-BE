const connection = require("../configs/db");
const fs = require("fs");

module.exports = {
  insertData: data => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO data_laundry SET ?",
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

  getData: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM data_laundry", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },

  deleteData: id => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT image FROM data_laundry WHERE id=?",
        id,
        (err, result) => {
          const img = result[0].image.replace(process.env.URL_IMG, "");
          fs.unlink(img, err => {
            if (err) {
              return;
            }
          });
        }
      );
      connection.query(
        "DELETE FROM data_laundry where id =?",
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
  },

  getPage: (page, total) => {
    const dataPage = 10; // jumlah data per halaman

    const totalPage = total / dataPage; // mengitung jumlah halaman

    const firstData = dataPage * page - dataPage; // menentukan awal data tiap halaman

    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM data_laundry order by id ASC LIMIT ?, ?",
        [firstData, dataPage],
        (err, result) => {
          if (!err) {
            const thisPage = Math.ceil(totalPage);
            if (page <= thisPage) {
              resolve([thisPage, `Curren Page: ${page}`, result]);
            }
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
        "UPDATE data_laundry SET ? WHERE id = ?",
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

  filterData: q => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * from data_laundry WHERE name LIKE ? ",
        "%" + q + "%",
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
  joinData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT data_laundry.*,features_laundry.name as feature,features_laundry.description,features_laundry.price,features_laundry.category FROM data_laundry join features_laundry on features_laundry.id_laundry=data_laundry.id WHERE data_laundry.id= ?",
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
  },
  status:(id,data)=>{
    return new Promise((resove,reject)=>{
      connection.query("UPDATE data_laundry SET ? WERE id=?",[data,id],(err,result)=>{
        if(!err){
          resolve(result)
        }else{
          reject(new Error(err))
        }
      })
    })
  },

  getDetail: id => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM data_laundry WHERE id = ?",
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
  },
};
