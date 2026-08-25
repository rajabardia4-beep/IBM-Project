const express = require("express");

const Task = require("../models/Task");
const Subject = require("../models/Subject");
const protect = require("../middleware/authMiddleware");

const router = express.Router();


router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.userId,
    })
      .populate("subjectId", "name color")
      .sort({ createdAt: -1 });

    res.json(tasks);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get tasks",
    });
  }
});


router.post("/", protect, async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      subjectId,
    } = req.body;


    if (!title || !subjectId) {
      return res.status(400).json({
        message: "Title and subject are required",
      });
    }


    const subject = await Subject.findOne({
      _id: subjectId,
      userId: req.userId,
    });


    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }


    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      subjectId,
      userId: req.userId,
    });


    const populatedTask = await task.populate(
      "subjectId",
      "name color"
    );


    res.status(201).json(populatedTask);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create task",
    });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      subjectId,
      status,
    } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (title !== undefined) {
      task.title = title;
    }

    if (description !== undefined) {
      task.description = description;
    }

    if (priority !== undefined) {
      task.priority = priority;
    }

    if (dueDate !== undefined) {
      task.dueDate = dueDate;
    }

    if (subjectId !== undefined) {
      task.subjectId = subjectId;
    }

    if (status !== undefined) {
      task.status = status;
    }

    await task.save();

    const updatedTask = await task.populate(
      "subjectId",
      "name color"
    );

    res.json(updatedTask);

  } catch (error) {
    console.error("Update task error:", error);

    res.status(500).json({
      message: "Failed to update task",
    });
  }
});
router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await Task.deleteOne({
      _id: req.params.id,
      userId: req.userId,
    });

    res.json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});
module.exports = router;