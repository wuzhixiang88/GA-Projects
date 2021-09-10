// DEPENDENCIES
const express = require("express");
const bcrypt = require("bcrypt");
const isUserLoggedIn = require("../middlewares/isUserLoggedIn");
const User = require("../models/user");
const Product = require("../models/product");
const Thread = require("../models/thread");

const controller = express.Router();

// ROUTES
controller.get("/logout", isUserLoggedIn, (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

controller.get("/inbox", isUserLoggedIn, async (req, res) => {
    try {
        const allThreads = await Thread.find(
            {
                $or: [
                    {
                        buyerUsername: req.session.username
                    },
                    {
                        sellerUsername: req.session.username
                    }
                ]
            }
        )
        .populate(
            {
                path: "productId",
                select: ["name", "img", "status"]
            }
        );

        res.render("users/inbox.ejs", {
            allThreads
        });
    
    } catch (err) {
        res.send(err);
    };
});

controller.get("/inbox/:id", isUserLoggedIn, async (req, res) => {
    try {
        const thread = await Thread.findOne(
            {
                _id: req.params.id
            }
        )
        .populate(
            {
                path: "productId",
                select: ["name", "img", "status"]
            }
        );

        res.render("users/message.ejs", {
            thread
        });

    } catch (err) {
        res.send(err);
    };
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
                password: hashedPassword,
                country: req.body.country
            }
        );

        const selectedUser = await User.findOne(
            {
                username: req.body.username
            }
        );

        req.session.userid = selectedUser._id;
        req.session.username = selectedUser.username;
        req.session.firstname = selectedUser.firstname;

        res.redirect("/");

    } catch (err) {
        res.send(`Unable to create a new account! Error: ${err.message}`)
    };
});

controller.post("/login", async (req, res) => {
    const selectedUser = await User.findOne(
        {
            username: req.body.username
        }
    );

    if (!selectedUser) {
        return res.send(`Username does not exist!`)
    };

    if (bcrypt.compareSync(req.body.password, selectedUser.password)) {
        req.session.userid = selectedUser._id;
        req.session.username = selectedUser.username;
        req.session.firstname = selectedUser.firstname;

        res.redirect("/");

    } else {
        return res.send(`Wrong password`);
    };
});

controller.post("/inbox", isUserLoggedIn, async (req, res) => {
    try {
        const thread = await Thread.findOne(
            {
                $and: [
                    {
                        buyerUsername: req.session.username
                    },
                    {
                        productId: req.body.productId
                    }
                ]
            }
        );

        if (!thread) {
            if (req.body.message) {
                await Thread.create(
                    {
                        buyerUsername: req.session.username,
                        sellerUsername: req.body.sellerUsername,
                        productId: req.body.productId,
                        messages: [
                            {
                                username: req.session.username,
                                body: req.body.message
                            }
                        ]
                    }
                );
            };
    
            if (req.body.offer) {
                await Thread.create(
                    {
                        buyerUsername: req.session.username,
                        sellerUsername: req.body.sellerUsername,
                        productId: req.body.productId,
                        offer: req.body.offer,
                        status: "Offered"
                    }
                );
            };

        } else {
            if (req.body.message) {
                await Thread.updateOne(
                    {
                        $and: [
                            {
                                buyerUsername: req.session.username
                            },
                            {
                                productId: req.body.productId
                            }
                        ]
                    },
                    {
                        $push: {
                            messages: {
                                username: req.session.username,
                                body: req.body.message
                            }
                        }
                    }
                );
            };

            if (req.body.offer) {
                await Thread.updateOne(
                    {
                        $and: [
                            {
                                buyerUsername: req.session.username
                            },
                            {
                                productId: req.body.productId
                            }
                        ]
                    },
                    {
                        offer: req.body.offer,
                        status: "Offered"
                    }
                );
            };
        };

        res.redirect(`/user/inbox`)
        
    } catch (err) {
        res.send(err);
    };
});

controller.patch("/inbox", isUserLoggedIn, async (req, res) => {
    try {
        if (req.body.sellerAction === "Accept Offer") {
            await Thread.updateOne(
                {
                    _id: req.body.threadId
                },
                {
                    status: "Accepted"
                }
            );

            await Product.updateOne(
                {
                    _id: req.body.productId
                },
                {
                    status: "Reserved"
                }
            );

        } else if (req.body.sellerAction === "Reject Offer") {
            await Thread.updateOne(
                {
                    _id: req.body.threadId
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

controller.patch("/inbox/:id", isUserLoggedIn, async (req, res) => {
    try {
        if (req.body.message) {
            await Thread.updateOne(
                {
                    _id: req.body.threadId
                },
                {
                    $push: {
                        messages: {
                            username: req.session.username,
                            body: req.body.message
                        }
                    }
                }
            );
        };

        if (req.body.sellerAction === "Accept Offer") {
            await Thread.updateOne(
                {
                    _id: req.body.threadId
                },
                {
                    status: "Accepted"
                }
            );

            await Product.updateOne(
                {
                    _id: req.body.productId
                },
                {
                    status: "Reserved"
                }
            );

        } else if (req.body.sellerAction === "Reject Offer") {
            await Thread.updateOne(
                {
                    _id: req.body.threadId
                },
                {
                    status: "Rejected"
                }
            );
        };

        res.redirect(`/user/inbox/${req.params.id}`)

    } catch (err) {
        res.send(err);
    };
});

// EXPORTS
module.exports = controller;