const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    subscription: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
});

const contactModel = mongoose.model("Contact", contactSchema);

module.exports = contactModel