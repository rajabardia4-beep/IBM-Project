const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTPEmail = async (email, otp) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "Study Planner <onboarding@resend.dev>",

            to: [email],

            subject: "Study Planner - Email Verification OTP",

            text: `Your Study Planner verification code is ${otp}. This code will expire in 10 minutes.`,

            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    padding: 30px;
                    max-width: 600px;
                    margin: auto;
                ">

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

        if (error) {
            console.error("Resend email error:", error);
            throw new Error(error.message);
        }

        console.log("OTP email sent successfully:", data?.id);

    } catch (error) {
        console.error("Email sending failed:", error);
        throw error;
    }
};

module.exports = sendOTPEmail;