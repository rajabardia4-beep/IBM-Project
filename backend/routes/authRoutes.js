const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const sendOTPEmail = require("../utils/email");
const { OAuth2Client } = require("google-auth-library");

const router = express.Router();

const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);



router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill all fields",
            });
        }

        const existingUser = await User.findOne({
            email,
        });

        

        if (existingUser) {

            if (existingUser.emailVerified) {
                return res.status(400).json({
                    message: "User already exists",
                });
            }

       

            const otp = Math.floor(
                100000 + Math.random() * 900000
            ).toString();

            existingUser.name = name;

            existingUser.password =
                await bcrypt.hash(password, 10);

            existingUser.emailVerificationOTP = otp;

            existingUser.emailVerificationOTPExpires =
                new Date(
                    Date.now() + 10 * 60 * 1000
                );

            await existingUser.save();

            await sendOTPEmail(email, otp);

            return res.status(200).json({
                message:
                    "OTP sent to your email. Please verify your email.",
            });
        }


    

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();


        const hashedPassword =
            await bcrypt.hash(password, 10);


        const user = await User.create({
            name,
            email,
            password: hashedPassword,

            emailVerified: false,

            emailVerificationOTP: otp,

            emailVerificationOTPExpires:
                new Date(
                    Date.now() + 10 * 60 * 1000
                ),
        });


        await sendOTPEmail(email, otp);


        res.status(201).json({
            message:
                "OTP sent to your email. Please verify your email.",
        });


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );

        res.status(500).json({
            message: "Server error",
        });
    }
});




router.post("/verify-email", async (req, res) => {

    try {

        const { email, otp } = req.body;


        if (!email || !otp) {

            return res.status(400).json({
                message:
                    "Email and OTP are required",
            });
        }



        const user = await User.findOne({
            email,
        });


        if (!user) {

            return res.status(404).json({
                message: "User not found",
            });
        }



        if (user.emailVerified) {

            return res.status(400).json({
                message:
                    "Email is already verified",
            });
        }



        if (!user.emailVerificationOTP) {

            return res.status(400).json({
                message:
                    "No OTP found. Please register again.",
            });
        }



        if (
            !user.emailVerificationOTPExpires ||
            user.emailVerificationOTPExpires <
                new Date()
        ) {

            return res.status(400).json({
                message:
                    "OTP has expired. Please register again to receive a new OTP.",
            });
        }



        if (
            user.emailVerificationOTP !==
            otp.toString()
        ) {

            return res.status(400).json({
                message: "Invalid OTP",
            });
        }


 

        user.emailVerified = true;

        user.emailVerificationOTP = null;

        user.emailVerificationOTPExpires = null;


        await user.save();


        res.status(200).json({
            message:
                "Email verified successfully! You can now login.",
        });


    } catch (error) {

        console.error(
            "Email verification error:",
            error
        );

        res.status(500).json({
            message: "Server error",
        });
    }
});




router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;


        if (!email || !password) {

            return res.status(400).json({
                message:
                    "Please enter email and password",
            });
        }



        const user = await User.findOne({
            email,
        });


        if (!user) {

            return res.status(401).json({
                message:
                    "Invalid email or password",
            });
        }



        if (!user.emailVerified) {

            return res.status(403).json({
                message:
                    "Please verify your email before logging in.",
            });
        }



        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({
                message:
                    "Invalid email or password",
            });
        }


   

        const token = jwt.sign(
            {
                userId: user._id,
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d",
            }
        );


        res.json({

            message: "Login successful!",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });


    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        res.status(500).json({
            message: "Server error",
        });
    }
});




router.post("/google", async (req, res) => {

    try {

        const { credential } = req.body;


        if (!credential) {

            return res.status(400).json({
                message:
                    "Google credential is required",
            });
        }



        const ticket =
            await googleClient.verifyIdToken({

                idToken: credential,

                audience:
                    process.env.GOOGLE_CLIENT_ID,
            });


        const payload =
            ticket.getPayload();


        const {
            sub: googleId,
            email,
            name,
        } = payload;


     

        let user =
            await User.findOne({
                email,
            });


      

        if (!user) {

        

            const randomPassword =
                await bcrypt.hash(
                    Math.random()
                        .toString(36) +
                    Date.now().toString(),
                    10
                );


            user = await User.create({

                name,

                email,

                password:
                    randomPassword,

                emailVerified: true,

                googleId,
            });

        } else {

            

            user.emailVerified = true;


            if (!user.googleId) {
                user.googleId = googleId;
            }

            await user.save();
        }


     

        const token = jwt.sign(

            {
                userId: user._id,
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d",
            }
        );


        res.json({

            message:
                "Google login successful!",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,
            },
        });


    } catch (error) {

        console.error(
            "Google login error:",
            error
        );

        res.status(401).json({

            message:
                "Google authentication failed",
        });
    }
});


module.exports = router;