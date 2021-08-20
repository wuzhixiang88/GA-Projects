// DEPENDENCIES
const express = require("express");
const controller = express.Router();

const Product = require("../models/product");

// SEED DATA FOR TESTING
// const seedData = require("../models/seed");

// controller.get("/seed", async (req, res) => {
//     Product.create(seedData);
    
//     res.send("Added Seed Data!")
// });

// INDEX ROUTE
controller.get("/", async (req, res) => {
    const allProducts = await Product.find();

    res.render("index.ejs", {
        allProducts 
    })
});

// SHOW ROUTE
controller.get("/:id", async (req, res) => {
    const product = await Product.find(
        {
            _id: req.params.id
        }
    );

    res.render("show.ejs",  {
        product: product[0]
    });
});

module.exports = controller;