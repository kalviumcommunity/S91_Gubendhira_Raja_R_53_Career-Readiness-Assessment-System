const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },

        category: {
            type: String,
            enum: [
                "aptitude",
                "technical",
                "communication",
                "problem_solving",
                "critical_thinking",
                "soft_skills",
                "interview",
                "career_awareness"
            ],
            required: true
        },

        description: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Skill", skillSchema);