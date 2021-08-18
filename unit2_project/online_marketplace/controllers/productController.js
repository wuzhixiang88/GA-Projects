// DEPENDENCIES
const express = require("express");
const controller = express.Router();

const Product = require("../models/product");

// INDEX ROUTE
controller.get("/", async (req, res) => {
    await Product.find();

    res.send("Ok")
});

module.exports = controller;