const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
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

       await transporter.verify();

        console.log(
            "✅ Gmail SMTP connection successful!"
        );

        const dueDate = new Date(
            task.dueDate
        ).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        const info = await transporter.sendMail({

            from: {
                name: "Study Planner",
                address: process.env.SMTP_USER,
            },

            to: email,

            subject:
                `Study Planner Reminder: ${task.title} is due tomorrow`,
            headers: {
                "X-Priority": "3",
                "X-Mailer": "Study Planner",
            },

            text: `
Study Planner Reminder

Your task is due tomorrow!

Task: ${task.title}

Subject: ${subject?.name || "No subject"
                }

Due Date: ${dueDate}

Priority: ${task.priority}

Don't forget to complete your task! 🚀
            `,

            html: `
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
                                ${subject?.name ||
                "No subject"
                }
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

                        ${task.description
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
            "✅ Email sent successfully!"
        );

        console.log(
            "Message ID:",
            info.messageId
        );

    } catch (error) {

        console.error(
            "❌ EMAIL ERROR:"
        );

        console.error(
            error
        );

        throw error;
    }
};

module.exports = sendReminderEmail;