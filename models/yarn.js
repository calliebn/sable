const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const yarnSchema = new Schema(
    {
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