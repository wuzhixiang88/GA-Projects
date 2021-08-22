// DEPENDENCIES
const express = require("express");
const Product = require("../models/product");

const controller = express.Router();

// SEED DATA FOR TESTING
// const seedData = require("../models/seed");

// controller.get("/seed", async (req, res) => {
//     Product.create(seedData);
    
//     res.send("Added Seed Data!")
// });

// INDEX ROUTE
controller.get("/", async (req, res) => {
    const allProducts = await Product.find();

    res.render("products/index.ejs", {
        allProducts 
    })
});

// SHOW ROUTE
controller.get("/:id", async (req, res) => {
    const product = await Product.findOne(
        {
            _id: req.params.id
        }
    );

    res.render("products/show.ejs",  {
        product
    });
});

// EDIT ROUTE
controller.get("/:id/edit", async (req, res) => {
    const product = await Product.findOne(
        {
            _id: req.params.id
        }
    );

    res.render("products/edit.ejs", {
        product
    });
});

// EXPORTS
module.exports = controller;