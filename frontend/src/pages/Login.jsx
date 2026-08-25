import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Box,
    Button,
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
            console.log("Email:", email);
            // console.log("Password:", password);
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password,
                }
            );
            console.log("Login response:", response.data);


            localStorage.setItem("token", response.data.token);

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

    return (
        <Box
            minH="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="gray.50"
            p="20px"
        >
            <Box
                bg="white"
                p="40px"
                width="400px"
                borderRadius="15px"
                shadow="md"
            >
                <Heading textAlign="center" mb="10px">
                    📚 Welcome Back
                </Heading>

                <Text
                    textAlign="center"
                    color="gray.500"
                    mb="25px"
                >
                    Login to your Study Planner
                </Text>

                <VStack gap="15px">

                    <Input
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        width="100%"
                        colorPalette="blue"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                    <Text
                        textAlign="center"
                        mt="20px"
                        color="gray.500"
                    >
                        Don't have an account?{" "}

                        <Button
                            variant="plain"
                            colorPalette="blue"
                            onClick={() => navigate("/register")}
                        >
                            Create Account
                        </Button>
                    </Text>

                </VStack>
            </Box>
        </Box>
    );
}

export default Login;