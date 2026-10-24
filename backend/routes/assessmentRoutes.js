
const express = require("express");
const mongoose = require("mongoose");

const Assessment = require("../models/Assessment");
const Skill = require("../models/Skills");
const User = require("../models/User");

const router = express.Router();

// CREATE an assessment
router.post("/", async (req, res) => {
    try {
        const {
            title,
            description,
            skills,
            durationMinutes,
            totalMarks,
            difficulty,
            createdBy
        } = req.body;

        if (!title || !Number.isFinite(durationMinutes) || durationMinutes < 1) {
            return res.status(400).json({
                message: "Title and a positive durationMinutes are required"
            });
        }

        if (!createdBy || !mongoose.isValidObjectId(createdBy)) {
            return res.status(400).json({
                message: "A valid createdBy User ID is required"
            });
        }

        const user = await User.findById(createdBy);

        if (!user) {
            return res.status(404).json({
                message: "Creator User not found"
            });
        }

        if (!Array.isArray(skills) || skills.length === 0) {
            return res.status(400).json({
                message: "Provide at least one Skill ID"
            });
        }

        if (!skills.every(id => mongoose.isValidObjectId(id))) {
            return res.status(400).json({
                message: "One or more Skill IDs are invalid"
            });
        }

        const uniqueSkillIds = [...new Set(skills.map(String))];
        const existingSkills = await Skill.find({
            _id: { $in: uniqueSkillIds }
        });

        if (existingSkills.length !== uniqueSkillIds.length) {
            return res.status(400).json({
                message: "One or more referenced Skills do not exist"
            });
        }

        const assessment = await Assessment.create({
            title,
            description,
            skills: uniqueSkillIds,
            durationMinutes,
            totalMarks,
            difficulty,
            createdBy
        });

        const populatedAssessment = await Assessment.findById(assessment._id)
            .populate("skills", "name category")
            .populate("createdBy", "name email role");

        return res.status(201).json({
            message: "Assessment created and relationships linked successfully",
            assessment: populatedAssessment
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message
            });
        }

        console.error("Create assessment error:", error.message);
        return res.status(500).json({
            message: "Failed to create assessment"
        });
    }
});

// GET all assessments and their related records
router.get("/", async (req, res) => {
    try {
        const assessments = await Assessment.find()
            .populate("skills", "name category description")
            .populate("createdBy", "name email role")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            count: assessments.length,
            assessments
        });
    } catch (error) {
        console.error("Get assessments error:", error.message);
        return res.status(500).json({
            message: "Failed to retrieve assessments"
        });
    }
});

// GET one assessment by ID
router.get("/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid Assessment ID"
            });
        }

        const assessment = await Assessment.findById(req.params.id)
            .populate("skills", "name category description")
            .populate("createdBy", "name email role");

        if (!assessment) {
            return res.status(404).json({
                message: "Assessment not found"
            });
        }

        return res.status(200).json({ assessment });
    } catch (error) {
        console.error("Get assessment error:", error.message);
        return res.status(500).json({
            message: "Failed to retrieve assessment"
        });
    }
});

module.exports = router;
