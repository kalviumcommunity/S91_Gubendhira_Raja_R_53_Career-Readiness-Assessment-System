
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { randomUUID } = require("crypto");

const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Create uploads folder automatically if it does not exist
const uploadDirectory = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Configure where and how uploaded files are stored
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadDirectory);
    },

    filename: (req, file, callback) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const uniqueName = `${randomUUID()}${extension}`;

        callback(null, uniqueName);
    }
});

// Allow only PDF and DOCX files
const fileFilter = (req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();

    const allowedTypes = {
        ".pdf": ["application/pdf"],
        ".docx": [
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ]
    };

    const allowedMimeTypes = allowedTypes[extension];

    if (!allowedMimeTypes || !allowedMimeTypes.includes(file.mimetype)) {
        const error = new Error("Only PDF and DOCX files are allowed.");
        error.statusCode = 400;
        return callback(error);
    }

    callback(null, true);
};

// Configure Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
});

// POST /api/uploads/resume
router.post(
    "/resume",
    authenticateToken,
    upload.single("resume"),
    (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    message: "Please select a resume to upload."
                });
            }

            return res.status(201).json({
                message: "Resume uploaded successfully!",
                file: {
                    originalName: req.file.originalname,
                    filename: req.file.filename,
                    size: req.file.size,
                    uploadedBy: req.auth.sub
                }
            });
        } catch (error) {
            console.error("Resume upload error:", error.message);

            return res.status(500).json({
                message: "Unable to upload resume."
            });
        }
    }
);

module.exports = router;
