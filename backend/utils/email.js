const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },

    tls: {
        rejectUnauthorized: false,
    },
});

const sendOTPEmail = async (email, otp) => {
    await transporter.sendMail({
        from: `"Study Planner" <${process.env.SMTP_USER}>`,

        to: email,

        subject: "Study Planner - Email Verification OTP",

        text: `Your Study Planner verification code is ${otp}. This code will expire in 10 minutes.`,

        html: `
            <div style="font-family: Arial, sans-serif; padding: 30px;">

                <h2 style="color: #6d28d9;">
                    📚 Study Planner
                </h2>

                <p>
                    Thank you for creating your Study Planner account.
                </p>

                <p>
                    Your email verification OTP is:
                </p>

                <h1 style="
                    letter-spacing: 8px;
                    color: #6d28d9;
                ">
                    ${otp}
                </h1>

                <p>
                    This OTP will expire in
                    <strong>10 minutes</strong>.
                </p>

                <p>
                    If you did not request this code,
                    you can safely ignore this email.
                </p>

            </div>
        `,
    });
};

module.exports = sendOTPEmail;