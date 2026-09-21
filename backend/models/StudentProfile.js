const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        studentId: {
            type: String,
            required: true,
            unique: true
        },

        department: {
            type: String,
            required: true
        },

        year: {
            type: Number,
            required: true
        },

        phone: {
            type: String
        },

        careerGoal: {
            type: String
        },

        technicalSkills: [
            {
                type: String
            }
        ],

        projects: [
            {
                title: String,
                description: String,
                technologies: [String]
            }
        ],

        certifications: [
            {
                name: String,
                issuer: String,
                year: Number
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("StudentProfile", studentProfileSchema);