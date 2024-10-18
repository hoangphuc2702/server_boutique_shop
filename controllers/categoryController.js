const express = require("express");
const Category = require("../models/category");

const app = express();

// Endpoint to get all categories
app.get("/getCategories", async (req, res) => {
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (err) {
        res.status(400).json({ err: 'ERROR' });
    }
});

// Endpoint to insert a new category
app.post("/insertCategory", async (req, res) => {
    try {
        const { name, urlImage, description} = req.body;
        console.log(name + ":" + urlImage + ":" + description);
        
        // Sử dụng phương thức createFromRequestBody để tạo Category mới
        const newCategory = Category.createFromRequestBody(req.body);

        await newCategory.save();
        res.status(201).json({ message: "Category created successfully" });
    } catch (error) {
        console.error("Error inserting category:", error);
        res.status(500).json({ error: "Failed to insert category" });
    }
});

// Endpoint to delete a category
app.delete("/deleteCategory/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        await Category.findByIdAndDelete(categoryId);
        res.json({ message: "Category deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete category" });
    }
});

// Endpoint to update a category
app.put("/updateCategory/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name, urlImage, description } = req.body;
        
        // Kiểm tra và cập nhật các trường
        const updateFields = {};
        if (name) updateFields.name = name;
        if (urlImage) updateFields.urlImage = urlImage;
        if (description) updateFields.description = description;

        await Category.findByIdAndUpdate(categoryId, updateFields);
        res.json({ message: "Category updated successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to update category" });
    }
});

// Endpoint to search category
app.get("/searchCategory/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const categories = await Category.find({ name: { $regex: name, $options: 'i' } }); // Tìm kiếm không phân biệt hoa thường
        res.json(categories);
    } catch (err) {
        res.status(400).json({ err: 'ERROR' });
    }
});

module.exports = app;
