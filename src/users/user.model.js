const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4 } = require("uuid");
const USER_STATUSES = require("./userStatuses");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatarUrl: {
        type: String,
    },
    subscription: {
        type: String,
        enum: ["free", "pro", "premium"],
        default: "free",
    },
    verificationToken: {
        type: String,
        required: false,
        default: () => v4(),
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(USER_STATUSES),
        default: USER_STATUSES.CREATED
    },
    token: String,
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel