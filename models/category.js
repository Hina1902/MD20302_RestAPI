const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const CategorySchema = new Schema({
    id: { type: ObjectId }, // khóa chính
    cateName: { type: String },
    parentID: { type: ObjectId, ref: 'category' }
});
module.exports = mongoose.models.category || mongoose.model('category', CategorySchema);

