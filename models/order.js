const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho model Order
const orderSchema = new Schema({
    userId: { type: String, required: true, trim: true },
    productId: { type: String, required: true, trim: true },
    dateOrder: { type: Date, required: true, trim: true },
    productName: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, trim: true },
    prices: { type: Number, required: true, trim: true },
    paymentType: { type: String, trim: true },
    status: {
        type: String,
        enum: ['đang xử lý', 'đang giao', 'đã giao', 'hủy'], // Chỉ cho phép 3 trạng thái này
        default: 'đang xử lý' // Mặc định là 'đang giao'
    }
});

// Phương thức tạo đối tượng Order từ req.body
orderSchema.statics.createFromRequestBody = function(body) {
    return new this({
        userId: body.userId,
        productId: body.productId,
        dateOrder: body.dateOrder,
        productName: body.productName,
        quantity: body.quantity,
        prices: body.prices,
        paymentType : body.paymentType,
        status : body.status
    });
};

// Tạo model Order từ schema và export nó
const Order = mongoose.model('orders', orderSchema);
module.exports = Order;
