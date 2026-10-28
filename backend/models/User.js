
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: 3,
            maxlength: 30
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: function () {
                return this.authProvider !== "google";
            }
        },

        authProvider: {
            type: String,
            enum: ["local", "google"],
            default: "local"
        },

        googleId: {
            type: String,
            unique: true,
            sparse: true
        },

        role: {
            type: String,
            enum: ["student", "faculty", "placement_officer", "admin"],
            default: "student"
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

module.exports = mongoose.model("User", userSchema);
