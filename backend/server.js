const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const subjectRoutes = require("./routes/subjectRoutes");

const {
  startReminderService,
} = require("./services/reminderService");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/tasks", taskRoutes);




mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(
      "MongoDB connected successfully! ✅"
    );

    startReminderService();
  })
  .catch((error) => {
    console.log(
      "MongoDB connection failed ❌"
    );

    console.log(error.message);
  });



app.get("/", (req, res) => {
  res.send(
    "Study Planner Backend is running! 🚀"
  );
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});