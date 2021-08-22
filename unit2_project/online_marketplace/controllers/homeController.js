// DEPENDENCIES
const express = require("express");
const controller = express.Router();

const Product = require("../models/product");

controller.get("/register", (req, res) => {
    res.render("signup.ejs")
});

controller.get("/", async (req, res) => {
    const allProducts = await Product.find();

    res.render("home.ejs", {
        allProducts 
    })
});

module.exports = controller;