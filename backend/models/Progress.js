const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "StudentProfile",
            required: true
        },

        skill: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skill",
            required: true
        },

        previousScore: {
            type: Number,
            default: 0
        },

        currentScore: {
            type: Number,
            default: 0
        },

        improvement: {
            type: Number,
            default: 0
        },

        assessedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Progress", progressSchema);