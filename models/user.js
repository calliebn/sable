const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = newSchema(
    {
        username: {
            type: String,
            trim: true,
            required: "Please enter your username"
        },

        email: {
            type: String,
            required: "Please enter your email"

        },

        password: {
            type: String,
            required: "Please enter your password"
        }
    }
)

const User = mongoose.model("User", userSchema)

module.exports = User;