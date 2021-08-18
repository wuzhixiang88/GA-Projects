// DEPENDENCIES
const express = require("express");
const app = express();

const productController = require("./controllers/productController");

// CONFIGURATION
const port = 3000;

// MIDDLEWARES


// ROUTERS
app.use("/product", productController);

// LISTEN
const server = app.listen(port, () => {
    console.log(`Listening to Port: ${port}`)
})