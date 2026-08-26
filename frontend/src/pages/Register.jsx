import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    Text,
    VStack,
} from "@chakra-ui/react";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [otp, setOtp] = useState("");

    const [otpStep, setOtpStep] = useState(false);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


   

    const handleRegister = async () => {

        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {

            setLoading(true);

            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name,
                    email,
                    password,
                }
            );

            alert(
                response.data.message ||
                "OTP sent to your email."
            );

            setOtpStep(true);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );

        } finally {

            setLoading(false);
        }
    };



    const handleVerifyOTP = async () => {

        if (!otp) {
            alert("Please enter the OTP");
            return;
        }

        try {

            setLoading(true);

            const response = await axios.post(
                "http://localhost:5000/api/auth/verify-email",
                {
                    email,
                    otp,
                }
            );

            alert(
                response.data.message ||
                "Email verified successfully!"
            );

            navigate("/login");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "OTP verification failed"
            );

        } finally {

            setLoading(false);
        }
    };


    return (
        <Box
            minH="100vh"
            bg="linear-gradient(135deg, #f8f7ff 0%, #eef2ff 100%)"
            p={{
                base: "15px",
                md: "30px",
            }}
        >


            <Button
                variant="ghost"
                onClick={() => navigate("/")}
                mb="20px"
            >
                ← Back to Home
            </Button>



            <Flex
                maxW="1050px"
                minH={{
                    base: "auto",
                    md: "650px",
                }}
                mx="auto"
                bg="white"
                borderRadius="25px"
                overflow="hidden"
                boxShadow="0 20px 60px rgba(0, 0, 0, 0.12)"
                direction={{
                    base: "column",
                    md: "row",
                }}
            >


                <Box
                    flex="1"
                    bg="linear-gradient(135deg, #6d28d9, #9333ea)"
                    color="white"
                    p={{
                        base: "40px 30px",
                        md: "50px",
                    }}
                    position="relative"
                    overflow="hidden"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                >


                    <Box
                        position="absolute"
                        w="250px"
                        h="250px"
                        borderRadius="full"
                        bg="white"
                        opacity="0.08"
                        top="-80px"
                        right="-80px"
                    />

                    <Box
                        position="absolute"
                        w="180px"
                        h="180px"
                        borderRadius="full"
                        bg="white"
                        opacity="0.08"
                        bottom="-70px"
                        left="-60px"
                    />


                    <Text
                        fontSize="45px"
                        mb="15px"
                    >
                        📚
                    </Text>


                    <Heading
                        fontSize={{
                            base: "35px",
                            md: "45px",
                        }}
                        lineHeight="1.1"
                    >
                        Plan.
                        <br />
                        Study.
                        <br />
                        Achieve.
                    </Heading>


                    <Text
                        mt="20px"
                        fontSize="lg"
                        opacity="0.9"
                        maxW="420px"
                    >
                        Create your Study Planner
                        account and take control
                        of your academic journey.
                    </Text>


                    <Box
                        mt="40px"
                        position="relative"
                        h="170px"
                    >

                        <Text
                            position="absolute"
                            fontSize="75px"
                            left="20px"
                            bottom="0"
                        >
                            📚
                        </Text>

                        <Text
                            position="absolute"
                            fontSize="60px"
                            right="45px"
                            top="0"
                        >
                            🎯
                        </Text>

                        <Text
                            position="absolute"
                            fontSize="50px"
                            left="170px"
                            bottom="10px"
                        >
                            📝
                        </Text>

                        <Text
                            position="absolute"
                            fontSize="45px"
                            right="10px"
                            bottom="10px"
                        >
                            ✅
                        </Text>

                    </Box>

                </Box>


                

                <Box
                    flex="1"
                    p={{
                        base: "35px 25px",
                        md: "55px",
                    }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >

                    <Box
                        w="100%"
                        maxW="400px"
                    >

                       
                        {!otpStep ? (

                            <>

                                <Heading
                                    textAlign="center"
                                    fontSize="32px"
                                >
                                    Create Account ✨
                                </Heading>


                                <Text
                                    textAlign="center"
                                    color="gray.500"
                                    mt="10px"
                                    mb="30px"
                                >
                                    Start your journey with
                                    Study Planner
                                </Text>


                                <VStack
                                    gap="18px"
                                    align="stretch"
                                >


                                    <Box>

                                        <Text
                                            mb="7px"
                                            fontWeight="medium"
                                        >
                                            Full Name
                                        </Text>

                                        <Input
                                            size="lg"
                                            placeholder="Enter your name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </Box>



                                    <Box>

                                        <Text
                                            mb="7px"
                                            fontWeight="medium"
                                        >
                                            Email
                                        </Text>

                                        <Input
                                            size="lg"
                                            placeholder="Enter your email"
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </Box>



                                    <Box>

                                        <Text
                                            mb="7px"
                                            fontWeight="medium"
                                        >
                                            Password
                                        </Text>

                                        <Input
                                            size="lg"
                                            placeholder="Create a password"
                                            type="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </Box>


                                    <Button
                                        size="lg"
                                        colorPalette="purple"
                                        w="100%"
                                        onClick={
                                            handleRegister
                                        }
                                        loading={loading}
                                    >
                                        Create Account 🚀
                                    </Button>


                                    <Text
                                        textAlign="center"
                                        mt="10px"
                                        color="gray.500"
                                    >
                                        Already have an account?{" "}

                                        <Button
                                            variant="plain"
                                            colorPalette="purple"
                                            onClick={() =>
                                                navigate(
                                                    "/login"
                                                )
                                            }
                                        >
                                            Login
                                        </Button>

                                    </Text>

                                </VStack>

                            </>

                        ) : (



                            <>

                                <Heading
                                    textAlign="center"
                                    fontSize="32px"
                                >
                                    Verify Your Email 📧
                                </Heading>


                                <Text
                                    textAlign="center"
                                    color="gray.500"
                                    mt="12px"
                                >
                                    We sent a 6-digit
                                    verification code to
                                </Text>


                                <Text
                                    textAlign="center"
                                    fontWeight="bold"
                                    color="purple.600"
                                    mt="5px"
                                    mb="30px"
                                    wordBreak="break-word"
                                >
                                    {email}
                                </Text>


                                <VStack
                                    gap="18px"
                                    align="stretch"
                                >

                                    <Box>

                                        <Text
                                            mb="7px"
                                            fontWeight="medium"
                                        >
                                            Enter OTP
                                        </Text>

                                        <Input
                                            size="lg"
                                            placeholder="Enter 6-digit OTP"
                                            value={otp}
                                            maxLength={6}
                                            textAlign="center"
                                            fontSize="xl"
                                            letterSpacing="8px"
                                            onChange={(e) =>
                                                setOtp(
                                                    e.target.value.replace(
                                                        /\D/g,
                                                        ""
                                                    )
                                                )
                                            }
                                        />

                                    </Box>


                                    <Button
                                        size="lg"
                                        colorPalette="purple"
                                        w="100%"
                                        onClick={
                                            handleVerifyOTP
                                        }
                                        loading={loading}
                                    >
                                        Verify Email ✅
                                    </Button>


                                    <Text
                                        textAlign="center"
                                        color="gray.500"
                                        fontSize="sm"
                                    >
                                        OTP is valid for
                                        10 minutes.
                                    </Text>


                                    <Button
                                        variant="ghost"
                                        colorPalette="purple"
                                        onClick={() =>
                                            setOtpStep(false)
                                        }
                                    >
                                        ← Back to Registration
                                    </Button>

                                </VStack>

                            </>

                        )}

                    </Box>

                </Box>

            </Flex>

        </Box>
    );
}

export default Register;