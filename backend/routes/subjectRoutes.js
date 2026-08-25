const express = require("express");
const Subject = require("../models/Subject");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const subjects = await Subject.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    res.json(subjects);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get subjects",
    });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const { name, description, color } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Subject name is required",
      });
    }

    const subject = await Subject.create({
      name,
      description,
      color,
      userId: req.userId,
    });

    res.status(201).json(subject);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create subject",
    });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const subject = await Subject.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    await Subject.deleteOne({
      _id: req.params.id,
      userId: req.userId,
    });

    res.json({
      message: "Subject deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete subject",
    });
  }
});
router.put("/:id", protect, async (req, res) => {
  try {
    const { name, description, color } = req.body;

    const subject = await Subject.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    subject.name = name || subject.name;
    subject.description = description;
    subject.color = color || subject.color;

    await subject.save();

    res.json(subject);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update subject",
    });
  }
});
module.exports = router;