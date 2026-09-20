const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        assessment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assessment",
            required: true
        },

        skill: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skill",
            required: true
        },

        questionText: {
            type: String,
            required: true
        },

        questionType: {
            type: String,
            enum: ["mcq", "multiple_choice", "true_false", "descriptive"],
            default: "mcq"
        },

        options: [
            {
                type: String
            }
        ],

        correctAnswer: {
            type: String,
            required: true
        },

        marks: {
            type: Number,
            default: 1
        },

        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "medium"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Question", questionSchema);