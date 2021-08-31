// DEPENDENCIES
const express = require("express");
const Product = require("../models/product");

const controller = express.Router();

// ROUTES
controller.get("/", async (req, res) => {
    try {
        const allProducts = await Product.find(
            {
                status: {
                    $eq: "For Sale"
                }
            }
        )
        .populate(
            {
                path: "sellerID",
                select: "username",
            }
        );
    
        res.render("home.ejs", {
            allProducts 
        });

    } catch (err) {
        res.send(err);
    };
});

// EXPORTS
module.exports = controller;