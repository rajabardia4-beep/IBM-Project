

const { BrevoClient } = require("@getbrevo/brevo");
const dotenv = require("dotenv");

dotenv.config();

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

const sendReminderEmail = async (
    email,
    task,
    subject
) => {
    try {
        console.log(
            "📧 Attempting to send reminder to:",
            email
        );

        const dueDate = new Date(
            task.dueDate
        ).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        const subjectName =
            subject?.name || "No subject";

        const result =
            await brevo.transactionalEmails.sendTransacEmail({

                sender: {
                    name: "Study Planner",
                    email: process.env.BREVO_SENDER_EMAIL,
                },

                to: [
                    {
                        email: email,
                    },
                ],

                subject:
                    `Study Planner Reminder: ${task.title} is due tomorrow`,

                textContent: `
Study Planner Reminder

Your task is due tomorrow!

Task: ${task.title}

Subject: ${subjectName}

Due Date: ${dueDate}

Priority: ${task.priority}

${task.description
    ? `Description: ${task.description}\n`
    : ""
}

Don't forget to complete your task! 🚀
                `,

                htmlContent: `
                    <div style="
                        font-family: Arial, sans-serif;
                        max-width: 600px;
                        margin: auto;
                        padding: 30px;
                        background-color: #f8f7ff;
                    ">

                        <div style="
                            background-color: white;
                            padding: 30px;
                            border-radius: 16px;
                        ">

                            <h2 style="color: #6d28d9;">
                                📚 Study Planner
                            </h2>

                            <h3>
                                ⏰ Task Reminder
                            </h3>

                            <p>
                                Your task is due tomorrow!
                            </p>

                            <div style="
                                background-color: #f3e8ff;
                                padding: 20px;
                                border-radius: 12px;
                                margin: 20px 0;
                            ">

                                <h2 style="color: #6d28d9;">
                                    ${task.title}
                                </h2>

                                <p>
                                    📚 <strong>Subject:</strong>
                                    ${subjectName}
                                </p>

                                <p>
                                    📅 <strong>Due Date:</strong>
                                    ${dueDate}
                                </p>

                                <p>
                                    ⭐ <strong>Priority:</strong>
                                    ${task.priority}
                                </p>

                            </div>

                            ${
                                task.description
                                    ? `
                                        <p>
                                            <strong>
                                                Description:
                                            </strong>
                                            ${task.description}
                                        </p>
                                    `
                                    : ""
                            }

                            <p>
                                Don't forget to complete
                                your task! 🚀
                            </p>

                            <hr />

                            <p style="
                                color: #999;
                                font-size: 13px;
                            ">
                                Automatic reminder from
                                Study Planner.
                            </p>

                        </div>

                    </div>
                `,
            });

        console.log(
            "✅ Reminder email sent successfully!"
        );

        console.log(
            "Message ID:",
            result?.messageId
        );

        return result;

    } catch (error) {

        console.error(
            "❌ Brevo reminder email failed:"
        );

        console.error(
            error?.message || error
        );

        throw new Error(
            "Failed to send reminder email"
        );
    }
};

module.exports = sendReminderEmail;