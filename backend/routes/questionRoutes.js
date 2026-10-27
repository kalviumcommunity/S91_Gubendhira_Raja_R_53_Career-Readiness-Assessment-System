
const express = require("express");
const mongoose = require("mongoose");

const Question = require("../models/Questions");
const Assessment = require("../models/Assessment");
const Skill = require("../models/Skills");
const {
    authenticateToken,
    requireRoles
} = require("../middleware/authMiddleware");

const router = express.Router();
router.use(authenticateToken);

// CREATE a question linked to an assessment and skill
router.post(
    "/",
    requireRoles("admin", "faculty", "placement_officer"),
    async (req, res) => {
    try {
        const {
            assessment,
            skill,
            questionText,
            questionType,
            options,
            correctAnswer,
            marks,
            difficulty
        } = req.body;

        if (!assessment || !mongoose.isValidObjectId(assessment)) {
            return res.status(400).json({
                message: "A valid Assessment ID is required"
            });
        }

        if (!skill || !mongoose.isValidObjectId(skill)) {
            return res.status(400).json({
                message: "A valid Skill ID is required"
            });
        }

        if (!questionText || !correctAnswer) {
            return res.status(400).json({
                message: "questionText and correctAnswer are required"
            });
        }

        const assessmentRecord = await Assessment.findById(assessment);
        if (!assessmentRecord) {
            return res.status(404).json({
                message: "Assessment not found"
            });
        }

        const skillRecord = await Skill.findById(skill);
        if (!skillRecord) {
            return res.status(404).json({
                message: "Skill not found"
            });
        }

        const skillBelongsToAssessment =
            assessmentRecord.skills.some(id => id.equals(skillRecord._id));

        if (!skillBelongsToAssessment) {
            return res.status(400).json({
                message: "This Skill is not linked to the selected Assessment"
            });
        }

        const question = await Question.create({
            assessment,
            skill,
            questionText,
            questionType,
            options,
            correctAnswer,
            marks,
            difficulty
        });

        const populatedQuestion = await Question.findById(question._id)
            .populate("assessment", "title durationMinutes")
            .populate("skill", "name category");

        return res.status(201).json({
            message: "Question created and relationships linked successfully",
            question: populatedQuestion
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message
            });
        }

        console.error("Create question error:", error.message);
        return res.status(500).json({
            message: "Failed to create question"
        });
    }
});

// GET questions, optionally filtered by assessment
router.get("/", async (req, res) => {
    try {
        const filter = {};

        if (req.query.assessment) {
            if (!mongoose.isValidObjectId(req.query.assessment)) {
                return res.status(400).json({
                    message: "Invalid Assessment ID"
                });
            }

            filter.assessment = req.query.assessment;
        }

        const questions = await Question.find(filter)
            .populate("assessment", "title durationMinutes")
            .populate("skill", "name category")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            count: questions.length,
            questions
        });
    } catch (error) {
        console.error("Get questions error:", error.message);
        return res.status(500).json({
            message: "Failed to retrieve questions"
        });
    }
});

// GET one question by ID
router.get("/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid Question ID"
            });
        }

        const question = await Question.findById(req.params.id)
            .populate("assessment", "title durationMinutes")
            .populate("skill", "name category");

        if (!question) {
            return res.status(404).json({
                message: "Question not found"
            });
        }

        return res.status(200).json({ question });
    } catch (error) {
        console.error("Get question error:", error.message);
        return res.status(500).json({
            message: "Failed to retrieve question"
        });
    }
});

module.exports = router;
