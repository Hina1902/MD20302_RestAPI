const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const imgSchema = new Schema({
    id: { type: ObjectId, default: () => new mongoose.Types.ObjectId() }, // tự tạo id
    link: { type: String },
    productID: { type: ObjectId, ref: "product" }
});

module.exports = mongoose.models.image || mongoose.model('image', imgSchema);
