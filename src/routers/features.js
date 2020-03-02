const express = require("express");
const Router = express.Router();

const featuresController = require("../controllers/features");

Router.get("/", featuresController.getData);
Router.post("/", featuresController.insertData);
Router.patch("/", featuresController.editData);
Router.delete("/", featuresController.deleteData);

module.exports = Router;
