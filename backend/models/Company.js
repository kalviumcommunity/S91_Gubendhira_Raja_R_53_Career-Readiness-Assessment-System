const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },

        industry: {
            type: String
        },

        website: {
            type: String
        },

        description: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Company", companySchema);