const mongoose = require("mongoose");

const jobRoleSchema = new mongoose.Schema(
    {
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String
        },

        requiredSkills: [
            {
                skill: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Skill"
                },

                requiredLevel: {
                    type: Number,
                    required: true
                }
            }
        ],

        minimumAptitudeScore: {
            type: Number,
            default: 0
        },

        minimumCommunicationScore: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("JobRole", jobRoleSchema);