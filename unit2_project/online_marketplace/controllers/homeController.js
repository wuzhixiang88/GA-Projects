// DEPENDENCIES
const express = require("express");
const Product = require("../models/product");

const controller = express.Router();

// ROUTES
controller.get("/", async (req, res) => {
    try {
        const allProducts = await Product.find().populate(
            {
                path: "sellerID",
                select: "username"
            }
        );
    
        res.render("home.ejs", {
            allProducts 
        });

    } catch (err) {
        res.status(400).send();
    };
});

// EXPORTS
module.exports = controller;