// DEPENDENCIES
const express = require("express");
const imgUpload = require("../middlewares/imgUpload");
const Product = require("../models/product");
const Thread = require("../models/thread");

const controller = express.Router();

// INDEX ROUTE
controller.get("/", async (req, res) => {
    try {
        const userProductList = await Product.find(
            {
                sellerId: req.session.userid
            }
        );
    
        res.render("products/index.ejs", {
            userProductList 
        })

    } catch (err) {
        res.send(err);
    };
});

// NEW ROUTE
controller.get("/new", (req, res) => {
    try {
        res.render("products/new.ejs");

    } catch (err) {
        res.send(err);
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
                path: "sellerId",
                select: "username"
            }
        );

        const thread = await Thread.findOne(
            {
                $and: [
                    {
                        buyerUsername: req.session.username
                    },
                    {
                        productId: product._id
                    }
                ]
            },
            {
                _id: 0,
                offer: 1,
                status: 1
            }
        );
    
        res.render("products/show.ejs",  {
            product,
            thread
        });

    } catch (err) {
        res.send(err);
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
        res.send(err);
    };
});

// CREATE ROUTE
controller.post("/", imgUpload.single("productImg"), async (req, res) => {
    try {
        await Product.create(
            {
                sellerId: req.session.userid,
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
        res.send(err);
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
        res.send(err);
    };
});

controller.patch("/:id", async (req, res) => {
    try {
        await Thread.updateOne(
            {
                $and: [
                    {
                        productId: req.body.productId
                    },
                    {
                        status: "Accepted"
                    }
                ]
            },
            {
                status: "Sold"
            }
        );

        await Product.updateOne(
            {
                _id: req.params.id
            },
            {
                status: "Sold"
            }
        );

        res.redirect(`/product/${req.params.id}`);

    } catch (err) {
        res.send(err);
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
        res.send(err);
    };
});

// EXPORTS
module.exports = controller;