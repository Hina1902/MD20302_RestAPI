const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const reviewSchema = new Schema({
    userID: { type: ObjectId, ref: 'user' },
    productID: { type: ObjectId, ref: 'product' },
    rating: { type: Number },
    description: { type: String },
    createAt: { type: Date }
});

module.exports = mongoose.model('review', reviewSchema);
