const { ObjectId } = require("mongodb");
const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const yarnSchema = new Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },

        company: {
            type: String
        },

        brand: {
            type: String

        },

        colorway: {
            type: String
        },

        yardage: {
            type: String
        },

        grams: {
            type: String
        },

        weight: {
            type: Number
        },

        skeins: {
            type: Number
        },

        dye_lot: {
            type: Number
        },

        description: {
            type: String
        }

    })

const Yarn = mongoose.model("Yarn", yarnSchema)

module.exports = Yarn;