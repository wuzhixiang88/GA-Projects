// DEPENDENCIES
const express = require("express");
const imgUpload = require("../middlewares/imgUpload");
const Product = require("../models/product");

const controller = express.Router();

// INDEX ROUTE
controller.get("/", async (req, res) => {
    try {
        const userProductList = await Product.find(
            {
                sellerID: req.session.userid
            }
        );
    
        res.render("products/index.ejs", {
            userProductList 
        })

    } catch (err) {
        res.status(400).send();
    };
});

// NEW ROUTE
controller.get("/new", (req, res) => {
    try {
        res.render("products/new.ejs");

    } catch (err) {
        res.status(400).send();
    };
});

// SHOW ROUTE
controller.get("/:id", async (req, res) => {
    try {
        const product = await Product.findOne(
            {
                _id: req.params.id
            }
        )
        .populate(
            {
                path: "sellerID",
                select: "username"
            }
        );
    
        res.render("products/show.ejs",  {
            product
        });

    } catch (err) {
        res.status(400).send();
    };
});

// EDIT ROUTE
controller.get("/:id/edit", async (req, res) => {
    try {
        const product = await Product.findOne(
            {
                _id: req.params.id
            }
        );
    
        res.render("products/edit.ejs", {
            product
        });

    } catch (err) {
        res.status(400).send();
    };
});

// CREATE ROUTE
controller.post("/", imgUpload.single("productImg"), async (req, res) => {
    try {
        await Product.create(
            {
                sellerID: req.session.userid,
                name: req.body.name,
                description: req.body.description,
                img: `/images/${req.file.filename}`,
                price: req.body.price,
                category: req.body.category,
                condition: req.body.condition,
                meetLocation: req.body.meetLocation
            }
        );
    
        res.redirect("/product");

    } catch (err) {
        res.status(400).send();
    };
});

// UPDATE ROUTE
controller.put("/:id", async (req, res) => {
    try {
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

    } catch (err) {
        res.status(400).send();
    };
});

// DESTROY ROUTE
controller.delete("/:id", async (req, res) => {
    try {
        await Product.findOneAndDelete(
            {
                _id: req.params.id
            }
        );
    
        res.redirect("/product");

    } catch {
        res.status(400).send();
    };
});

// EXPORTS
module.exports = controller;