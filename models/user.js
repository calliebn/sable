const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require('express-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter your username"]
        },

        email: {
            type: String,
            required: [true, "Please enter your email"]

        },

        password: {
            type: String,
            required: [true, "Please enter your password"]
        }

        // passwordConfirm: {
        //     type: String,
        //     required: [true, "Please retype your password"],
        //     validate: {
        //         validator: function (el) {
        //             return el === this.password;
        //         }, message: "Passwords don\'t match."
        //     }
        // }
    }
);

// schema middleware to apply before saving
userSchema.pre('save', async function (next) {

    // hashing the password, sets hash to 12
    this.password = await bcrypt.hash(this.password, 12);

    // removes the password confirm field
    this.passwordConfirm = undefined;
    next();
});

// check password at login
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

const User = mongoose.model("User", userSchema)

module.exports = User;