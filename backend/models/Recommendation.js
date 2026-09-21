const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "StudentProfile",
            required: true
        },

        skill: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skill"
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String
        },

        type: {
            type: String,
            enum: [
                "course",
                "practice",
                "workshop",
                "mock_interview",
                "project",
                "certification"
            ]
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        },

        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Recommendation",
    recommendationSchema
);