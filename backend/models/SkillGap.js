const mongoose = require("mongoose");

const skillGapSchema = new mongoose.Schema(
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

        requiredLevel: {
            type: Number,
            required: true
        },

        currentLevel: {
            type: Number,
            required: true
        },

        gap: {
            type: Number,
            required: true
        },

        severity: {
            type: String,
            enum: ["low", "medium", "high", "critical"],
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("SkillGap", skillGapSchema);