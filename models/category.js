const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho model User
const categorySchema = new Schema({
    name: { type: String, required: true, trim: true },
    urlImage: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }
});

// Phương thức tạo đối tượng Category từ req.body
categorySchema.statics.createFromRequestBody = function(body) {
    return new this({
        name: body.name,
        urlImage: body.urlImage,
        description: body.description
    });
};

// Tạo model Category từ schema và export nó
const Category = mongoose.model('categories', categorySchema);
module.exports = Category;
