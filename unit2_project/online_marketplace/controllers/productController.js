const express = require("express");
const controller = express.Router();

controller.get("/", async (req, res) => {
    res.send("ok")
});

module.exports = controller;