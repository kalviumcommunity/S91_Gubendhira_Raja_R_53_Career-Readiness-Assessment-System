const mongoose = require("mongoose");

const assessmentAttemptSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "StudentProfile",
            required: true
        },

        assessment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assessment",
            required: true
        },

        answers: [
            {
                question: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Question"
                },

                answer: String,

                isCorrect: Boolean,

                marksObtained: Number
            }
        ],

        score: {
            type: Number,
            default: 0
        },

        percentage: {
            type: Number,
            default: 0
        },

        startedAt: {
            type: Date
        },

        submittedAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "AssessmentAttempt",
    assessmentAttemptSchema
);