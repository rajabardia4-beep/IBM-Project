const { BrevoClient } = require("@getbrevo/brevo");
const dotenv = require("dotenv");
dotenv.config();

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

const sendOTPEmail = async (email, otp) => {
    try {
        const result = await brevo.transactionalEmails.sendTransacEmail({
            sender: {
                name: "Study Planner",
                email: process.env.BREVO_SENDER_EMAIL,
            },

            to: [
                {
                    email: email,
                },
            ],

            subject: "Study Planner - Email Verification OTP",

            textContent: `
Your Study Planner verification code is ${otp}.

This code will expire in 10 minutes.

If you did not request this code, you can safely ignore this email.
            `,

            htmlContent: `
                <div style="
                    font-family: Arial, sans-serif;
                    padding: 30px;
                    max-width: 600px;
                    margin: auto;
                    background-color: #ffffff;
                ">

                    <h2 style="
                        color: #6d28d9;
                        margin-bottom: 20px;
                    ">
                        📚 Study Planner
                    </h2>

                    <p>
                        Thank you for creating your Study Planner account.
                    </p>

                    <p>
                        Your email verification OTP is:
                    </p>

                    <div style="
                        margin: 25px 0;
                        padding: 20px;
                        background-color: #f5f3ff;
                        border-radius: 10px;
                        text-align: center;
                    ">
                        <h1 style="
                            letter-spacing: 8px;
                            color: #6d28d9;
                            margin: 0;
                            font-size: 36px;
                        ">
                            ${otp}
                        </h1>
                    </div>

                    <p>
                        This OTP will expire in
                        <strong>10 minutes</strong>.
                    </p>

                    <p style="color: #666666;">
                        If you did not request this code,
                        you can safely ignore this email.
                    </p>

                    <hr style="
                        border: none;
                        border-top: 1px solid #eeeeee;
                        margin: 30px 0;
                    ">

                    <p style="
                        font-size: 12px;
                        color: #999999;
                    ">
                        This is an automated email from Study Planner.
                        Please do not reply to this email.
                    </p>

                </div>
            `,
        });

        console.log(
            "OTP email sent successfully:",
            result?.messageId
        );

        return result;

    } catch (error) {
        console.error(
            "Brevo email sending failed:",
            error?.message || error
        );

        throw new Error("Failed to send OTP email");
    }
};

module.exports = sendOTPEmail;