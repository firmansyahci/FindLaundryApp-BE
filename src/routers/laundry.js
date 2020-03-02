const express = require("express");
const multer = require("multer");
const Router = express.Router();

const laundryController = require("../controllers/laundry");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/laundry");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, next) {
    if (!file) {
      next();
    }
    const image = file.mimetype.startsWith("image/");
    if (image) {
      next(null, true);
    } else {
      next({ message: "Only image Allowed!" });
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2
  }
}).single("image");

Router.post(
  "/",
  (req, res, next) => {
    upload(req, res, err => {
      if (err) {
        res.send(err);
      } else {
        next();
      }
    });
  },
  laundryController.insertData
);

Router.patch(
  "/",
  (req, res, next) => {
    upload(req, res, err => {
      if (err) {
        res.send(err);
      } else {
        next();
      }
    });
  },
  laundryController.editData
);

Router.get("/", laundryController.getData);
Router.delete("/", laundryController.deleteData);
Router.get("/filter", laundryController.filterData);
Router.get("/join", laundryController.joinData);
Router.patch('/status', laundryController.status)
Router.get('/detail',laundryController.getDetail)
module.exports = Router;
