// DEPENDENCIES
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

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

// EXPORTS
module.exports = controller;