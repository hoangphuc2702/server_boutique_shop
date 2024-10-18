const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho model User
const productSchema = new Schema({
    categoryId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    urlImage: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    sizes: [String], // Danh sách kích cỡ có sẵn
    colors: [String], // Danh sách màu sắc có sẵn
    isHot: { type: Boolean, default: 0 }, // 0: sp bình thường, 1: sp nổi bật
    onSale: { type: Boolean, default: 0 }, // 0: bình thường, 1: đang khuyến mãi
});

// Phương thức tạo đối tượng Product từ req.body
productSchema.statics.createFromRequestBody = function(body) {
    return new this({
        categoryId: body.categoryId,
        name: body.name,
        urlImage: body.urlImage,
        description: body.description,
        price: body.price,
        sizes: body.sizes,
        colors: body.colors,
        isHot: body.isHot,
        onSale: body.onSale
    });
};

// Tạo model Product từ schema và export nó
const Product = mongoose.model('products', productSchema);
module.exports = Product;
