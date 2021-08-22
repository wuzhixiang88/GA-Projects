// DEPENDENCIES
const express = require("express");
const controller = express.Router();

const Product = require("../models/product");

// ROUTES
controller.get("/", async (req, res) => {
    const allProducts = await Product.find();

    res.render("home.ejs", {
        allProducts 
    })
});

// EXPORTS
module.exports = controller;