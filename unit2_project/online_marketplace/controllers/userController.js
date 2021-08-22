// DEPENDENCIES
const express = require("express");
const controller = express.Router();


controller.get("/register", (req, res) => {
    res.render("signup.ejs")
});

controller.get("/login", (req, res) => {
    res.render("login.ejs")
});

module.exports = controller;