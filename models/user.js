const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            unique: [true, 'That username is already taken'],
            lowercase: true,
            validate: [validator.isAlphanumeric, 'Usernames can only have letters and numbers']
        },

        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: [true, 'that email address is already in use'],
            lowercase: true,
            validate: [validator.isEmail, 'Please enter a valid email address']

        },

        password: {
            type: String,
            required: [true, "Please enter your password"],
            minLength: [6, 'Password must be at least six characters']
        },

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