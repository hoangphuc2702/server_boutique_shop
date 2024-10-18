const express = require("express");
const mongoose = require("mongoose");
const userController = require("./controllers/userController");
const categoryController = require("./controllers/categoryController");
const orderController = require("./controllers/orderController");
const productController = require("./controllers/productController");

const link = "mongodb+srv://tonthathoangphuc270203:22F9ghpERKKSB0Rs@cluster0.umfaw.mongodb.net/boutiqueShopDb";


const app = express();

mongoose.connect(link)
    .then(() => {
        console.log("successfully connect");
    })
    .catch((err) => {
        console.log(err);
    });

// Middleware for parsing JSON data from requests
app.use(express.json());

// app.get('/', (req, res) => res.json({ answer: 42 }));
app.get('/', (req, res) =>{
    res.send("Hello world!")
});

// user controller
app.use("/user", userController);

// category controller
app.use("/category", categoryController);

// product controller
app.use("/product", productController);

// order controller
app.use("/order", orderController);

app.listen(3002, () => {
    console.log("Server is running port http://localhost:3002");
});