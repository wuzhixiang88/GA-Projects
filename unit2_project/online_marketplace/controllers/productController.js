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
    const userProductList = await Product.find(
        {
            user: req.session.userid
        }
    );

    res.render("products/index.ejs", {
        userProductList 
    })
});

// NEW ROUTE
controller.get("/new", async (req, res) => {
    res.render("products/new.ejs");
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

// CREATE ROUTE
controller.post("/", async (req, res) => {
    await Product.create(
        {
            user: req.session.userid,
            name: req.body.name,
            description: req.body.description,
            img: req.body.img,
            price: req.body.price,
            category: req.body.category,
            condition: req.body.condition,
            meetLocation: req.body.meetLocation
        }
    );

    res.redirect("/product");
});

// UPDATE ROUTE
controller.put("/:id", async (req, res) => {
    await Product.updateOne(
        {
            _id: req.params.id
        },
        {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            condition: req.body.condition,
            meetLocation: req.body.meetLocation
        }
    );

    res.redirect(`/product/${req.params.id}`);
});

// DESTROY ROUTE
controller.delete("/:id", async (req, res) => {
    await Product.findOneAndDelete(
        {
            _id: req.params.id
        }
    );

    res.redirect("/product");
});

// EXPORTS
module.exports = controller;