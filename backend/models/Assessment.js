
const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        skills: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Skill"
            }
        ],

        durationMinutes: {
            type: Number,
            required: true,
            min: 1
        },

        totalMarks: {
            type: Number,
            default: 0,
            min: 0
        },

        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "medium"
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Assessment", assessmentSchema);
