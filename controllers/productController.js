const express = require("express");
const Product = require("../models/product");

const app = express();

// Endpoint to get all products
app.get("/getProducts", async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        res.status(400).json({ err: 'ERROR' });
    }
});

// Endpoint to insert a new product
app.post("/insertProduct", async (req, res) => {
    try {
        const { categoryId, name, urlImage, description, price, sizes, colors } = req.body;
        console.log(categoryId + ":" + name + ":" + urlImage + ":" + description + ":" + price + ":" + sizes + ":" + colors);
        
        // Sử dụng phương thức createFromRequestBody để tạo Product mới
        const newProduct = Product.createFromRequestBody(req.body);

        await newProduct.save();
        res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
        console.error("Error inserting product:", error);
        res.status(500).json({ error: "Failed to insert product" });
    }
});

// Endpoint to delete a product
app.delete("/deleteProduct/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        await Product.findByIdAndDelete(productId);
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete product" });
    }
});

// Endpoint to update a product
app.put("/updateProduct/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const { categoryId, name, urlImage, description, price, sizes, colors } = req.body;
        
        // Kiểm tra và cập nhật các trường
        const updateFields = {};
        if (categoryId) updateFields.categoryId = categoryId;
        if (name) updateFields.name = name;
        if (urlImage) updateFields.urlImage = urlImage;
        if (description) updateFields.description = description;
        if (price) updateFields.price = price;
        if (sizes) updateFields.sizes = sizes;
        if (colors) updateFields.colors = colors;

        await Product.findByIdAndUpdate(productId, updateFields);
        res.json({ message: "Product updated successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to update product" });
    }
});

// Endpoint to search product
app.get("/searchProductbyname/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const products = await Product.find({ name: { $regex: name, $options: 'i' } }); // Tìm kiếm không phân biệt hoa thường
        res.json(products);
    } catch (err) {
        res.status(400).json({ err: 'ERROR' });
    }
});

// Endpoint to search product by category
app.get("/searchProductbycategory/:categoryId", async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const products = await Product.find({ categoryId: { $regex: categoryId, $options: 'i' } });
        res.json(products);
    } catch (err) {
        res.status(400).json({ err: 'ERROR' });
    }
});

module.exports = app;
