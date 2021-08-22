// DEPENDENCIES
const express = require("express");
const Product = require("../models/product");

const controller = express.Router();

// ROUTES
controller.get("/", async (req, res) => {
    const allProducts = await Product.find();

    res.render("home.ejs", {
        allProducts 
    })
});

// EXPORTS
module.exports = controller;