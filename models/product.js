const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    stats: { type: Boolean, default: true },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    CateID: { type: Schema.Types.ObjectId, ref: "category" }
});

module.exports = mongoose.model('product', productSchema);
