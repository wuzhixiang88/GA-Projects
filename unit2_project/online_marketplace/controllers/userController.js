// DEPENDENCIES
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const controller = express.Router();

controller.get("/signup", (req, res) => {
    res.render("signup.ejs")
});

controller.get("/login", (req, res) => {
    res.render("login.ejs")
});

controller.post("/signup", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await User.create(
            {
                username: req.body.username,
                password: hashedPassword
            }
        );

        res.send(`Your account has been create successfully!`);

    } catch (err) {
        res.send(`Unable to create a new account!\n${err.message}`)
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
        req.session.username = selectedUser;

        res.redirect("/");

    } else {
        return res.send(`Wrong password`);
    };
});

module.exports = controller;