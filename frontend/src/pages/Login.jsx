import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    Text,
    VStack,
} from "@chakra-ui/react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password,
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert("Login successful! 🎉");

            navigate("/dashboard");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };


    const handleGoogleLogin = async (
        credentialResponse
    ) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/google",
                {
                    credential:
                        credentialResponse.credential,
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/dashboard");

        } catch (error) {
            console.error(
                "Google login error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Google login failed"
            );
        }
    };


    return (
        <Box
            minH="100vh"
            bg="linear-gradient(135deg, #f8f7ff 0%, #eef2ff 100%)"
            p={{ base: "15px", md: "30px" }}
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
                        Study smarter.
                        <br />
                        Achieve more.
                    </Heading>


                    <Text
                        mt="20px"
                        fontSize="lg"
                        opacity="0.9"
                        maxW="420px"
                    >
                        Organize your subjects, manage
                        your tasks, and stay on track with
                        your academic goals.
                    </Text>



                    <Box
                        mt="40px"
                        position="relative"
                        h="190px"
                    >

                        <Text
                            position="absolute"
                            fontSize="90px"
                            left="20px"
                            bottom="0"
                        >
                            👨‍💻
                        </Text>

                        <Text
                            position="absolute"
                            fontSize="60px"
                            right="40px"
                            top="0"
                        >
                            📊
                        </Text>

                        <Text
                            position="absolute"
                            fontSize="55px"
                            left="160px"
                            bottom="10px"
                        >
                            📚
                        </Text>

                        <Text
                            position="absolute"
                            fontSize="50px"
                            right="10px"
                            bottom="5px"
                        >
                            🎯
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


                        <Heading
                            textAlign="center"
                            fontSize="32px"
                        >
                            Welcome Back! 👋
                        </Heading>


                        <Text
                            textAlign="center"
                            color="gray.500"
                            mt="10px"
                            mb="30px"
                        >
                            Login to continue to your
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
                                <Flex
                                    justify="space-between"
                                    mb="7px"
                                >
                                    <Text
                                        fontWeight="medium"
                                    >
                                        Password
                                    </Text>

                                    <Text
                                        fontSize="sm"
                                        color="purple.600"
                                        cursor="pointer"
                                    >
                                        Forgot password?
                                    </Text>
                                </Flex>

                                <Input
                                    size="lg"
                                    placeholder="Enter your password"
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
                                onClick={handleLogin}
                            >
                                Login
                            </Button>



                            <Flex
                                align="center"
                                gap="12px"
                                my="5px"
                            >
                                <Box
                                    flex="1"
                                    h="1px"
                                    bg="gray.200"
                                />

                                <Text
                                    color="gray.400"
                                    fontSize="sm"
                                >
                                    OR
                                </Text>

                                <Box
                                    flex="1"
                                    h="1px"
                                    bg="gray.200"
                                />
                            </Flex>



                            <Flex
                                justify="center"
                                w="100%"
                            >
                                <GoogleLogin
                                    onSuccess={
                                        handleGoogleLogin
                                    }
                                    onError={() => {
                                        alert(
                                            "Google login failed"
                                        );
                                    }}
                                />
                            </Flex>



                            <Text
                                textAlign="center"
                                mt="15px"
                                color="gray.500"
                            >
                                Don't have an account?{" "}

                                <Button
                                    variant="plain"
                                    colorPalette="purple"
                                    onClick={() =>
                                        navigate(
                                            "/register"
                                        )
                                    }
                                >
                                    Create Account
                                </Button>
                            </Text>

                        </VStack>

                    </Box>

                </Box>

            </Flex>

        </Box>
    );
}

export default Login;