const mongoose = require('mongoose');
const schema = mongoose.Schema;

export const nazotabiSchema = new schema({
    id: {type: Number, isNumber: true, unique: true},
    version: Number,
    nazoplace: String,
    nazoActivity: String,
    place: String,
    meta: {
        goods: Number,
        bads: Number
    },
    createdAt: {type: Date, default: Date.now}
});