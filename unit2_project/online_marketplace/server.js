// DEPENDENCIES
require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dbConnection = mongoose.connection;

const session = require("express-session");
const methodOverride = require("method-override");

const isUserLoggedIn = require("./middlewares/isUserLoggedIn");
const sessionUserInfo = require("./middlewares/sessionUserInfo");

const homeController = require("./controllers/homeController");
const userController = require("./controllers/userController");
const productController = require("./controllers/productController");

// CONFIGURATION
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT;

// FOR FIXING MONGOOSE DEPRECATION WARNING
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)

// CONNECT TO MONGO
mongoose.connect(mongoURI, () => {
    console.log("Connection with Mongo Database is established.")
});

dbConnection.on("error", (err) => console.log(err.message));
dbConnection.on("connected", () => console.log("Mongo connected..."));
dbConnection.on("disconnected", () => console.log("Mongo disconnected..."));

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(sessionUserInfo);
// app.use((req, res, next) => {
//     res.locals.username = req.session.username;
//     res.locals.firstname = req.session.firstname;
//     next();
// });

// ROUTERS
app.use(homeController);
app.use("/user", userController);
app.use("/product", isUserLoggedIn, productController);

app.use("*", (req, res) => {
    res.status(404);
    res.send("Page is not found.")
});

// LISTEN
const server = app.listen(port, () => {
    console.log(`Listening to Port: ${port}`)
})