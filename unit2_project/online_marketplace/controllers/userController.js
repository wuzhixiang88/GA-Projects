// DEPENDENCIES
const express = require("express");
const bcrypt = require("bcrypt");
const isUserLoggedIn = require("../middlewares/isUserLoggedIn");
const User = require("../models/user");
const Product = require("../models/product");
const Offer = require("../models/offer");

const controller = express.Router();

// ROUTES
controller.get("/signup", (req, res) => {
    res.render("users/signup.ejs")
});

controller.get("/login", (req, res) => {
    res.render("users/login.ejs")
});

controller.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

controller.get("/inbox", isUserLoggedIn, async (req, res) => {
    try {
        const allOffers = await Offer.find(
            {
                $or: [
                    {
                        sellerUsername: req.session.username
                    },
                    {
                        buyerUsername: req.session.username
                    }
                ]
            }
        )
        .populate(
            {
                path: "productID",
                select: ["name", "img"]
            }
        );

        res.render("users/inbox.ejs", {
            allOffers
        });
    
    } catch (err) {
        res.send(err);
    }
});

controller.post("/signup", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await User.create(
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                password: hashedPassword
            }
        );

        res.send(`Your account has been create successfully!`);

    } catch (err) {
        res.send(`Unable to create a new account! Error: ${err.message}`)
    }
});

controller.post("/login", async (req, res) => {
    const selectedUser = await User.findOne(
        {
            username: req.body.username
        }
    );

    if (!selectedUser) {
        return res.send(`Username does not exist!`)
    }

    if (bcrypt.compareSync(req.body.password, selectedUser.password)) {
        req.session.userid = selectedUser._id;
        req.session.username = selectedUser.username;
        req.session.firstname = selectedUser.firstname;

        res.redirect("/");

    } else {
        return res.send(`Wrong password`);
    };
});

controller.post("/inbox", async (req, res) => {
    try {
        await Offer.create(
            {
                buyerUsername: req.session.username,
                sellerUsername: req.body.sellerUsername,
                productID: req.body.productID,
                offer: req.body.offer,
            }
        );
        
        res.redirect("/user/inbox");

    } catch (err) {
        res.send(err);
    };
});

controller.patch("/inbox", isUserLoggedIn, async (req, res) => {
    try {
        if (req.body.sellerAction === "Accept Offer") {
            await Offer.updateOne(
                {
                    _id: req.body.offerID
                },
                {
                    status: "Accepted"
                }
            );

            await Product.updateOne(
                {
                    _id: req.body.productID
                },
                {
                    status: "Reserved"
                }
            );

        } else if (req.body.sellerAction === "Reject Offer") {
            await Offer.updateOne(
                {
                    _id: req.body.offerID
                },
                {
                    status: "Rejected"
                }
            );
        };

        res.redirect("/user/inbox");
        
    } catch (err) {
        res.send(err);
    };
});

// EXPORTS
module.exports = controller;