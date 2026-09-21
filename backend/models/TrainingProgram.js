const mongoose = require("mongoose");

const trainingProgramSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String
        },

        skill: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skill",
            required: true
        },

        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        durationWeeks: {
            type: Number
        },

        startDate: {
            type: Date
        },

        endDate: {
            type: Date
        },

        capacity: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "TrainingProgram",
    trainingProgramSchema
);