const cron = require("node-cron");
const Task = require("../models/Task");
const sendReminderEmail = require("../utils/reminderEmail");

const checkUpcomingTasks = async () => {
    try {
        console.log("🔔 Checking upcoming task reminders...");

        const now = new Date();

        const tomorrow = new Date(now);

        tomorrow.setDate(
            tomorrow.getDate() + 1
        );

        const startOfTomorrow = new Date(
            tomorrow.getFullYear(),
            tomorrow.getMonth(),
            tomorrow.getDate(),
            0,
            0,
            0,
            0
        );

        const endOfTomorrow = new Date(
            tomorrow.getFullYear(),
            tomorrow.getMonth(),
            tomorrow.getDate(),
            23,
            59,
            59,
            999
        );

        const tasks = await Task.find({
            status: "pending",

            dueDate: {
                $gte: startOfTomorrow,
                $lte: endOfTomorrow,
            },

            reminderSent: false,
        })
            .populate("userId")
            .populate("subjectId");

        console.log(
            `Found ${tasks.length} task(s) needing reminders.`
        );

        for (const task of tasks) {

            console.log(
                "Processing task:",
                task.title
            );

            if (!task.userId) {
                console.log(
                    "❌ No user found for task:",
                    task.title
                );

                continue;
            }

            console.log(
                "User email:",
                task.userId.email
            );

            console.log(
                "Email verified:",
                task.userId.emailVerified
            );

         
            await sendReminderEmail(
                task.userId.email,
                task,
                task.subjectId
            );

            task.reminderSent = true;

            await task.save();

            console.log(
                `✅ Reminder sent for: ${task.title}`
            );
        }

    } catch (error) {

        console.error(
            "❌ Reminder service error:"
        );

        console.error(error);
    }
};




const startReminderService = () => {

    cron.schedule(
        "0 9 * * *",
        async () => {

            console.log(
                "⏰ Running daily reminder check..."
            );

            await checkUpcomingTasks();
        }
    );

    console.log(
        "🔔 Reminder service started."
    );
};


module.exports = {
    startReminderService,
    checkUpcomingTasks,
};