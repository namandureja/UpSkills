const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: String,
        password: String,
        skills: Array,
        username: String,
        about : String,
        fName: String,
        lName : String,
        address: String,
        city: String,
        country: String,
        postalCode: Number,
        uni : String,
        degree: String,
        field : String,
        createdAt: {
            type: Date,
            default: Date.now
        },

    }, { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
