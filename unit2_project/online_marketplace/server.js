// DEPENDENCIES
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dbConnection = mongoose.connection;

const productController = require("./controllers/productController");

// CONFIGURATION
const mongoURI = "";
const port = 3000;

// CONNECT TO MONGO
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connection with Mongo Database is established.")
});

dbConnection.on("error", (err) => console.log(err.message));
dbConnection.on("connected", () => console.log("Mongo connected..."));
dbConnection.on("disconnected", () => console.log("Mongo disconnected..."));

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// ROUTERS
app.use("/product", productController);

// LISTEN
const server = app.listen(port, () => {
    console.log(`Listening to Port: ${port}`)
})