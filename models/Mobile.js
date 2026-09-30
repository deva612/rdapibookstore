const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mobileSchema = new Schema({
    mobileName: { type: String },
    brandName: { type: String },
    price: { type: Number },
    RAM: { type: String },
    ROM: { type: Number },
});
module.exports = mongoose.model('Mobile', mobileSchema);