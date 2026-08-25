import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
      alert("Registration successful! Please login.");

      navigate("/login");

      alert(response.data.message);

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration failed"
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
          📚 Create Account
        </Heading>

        <Text
          textAlign="center"
          color="gray.500"
          mb="25px"
        >
          Create your Study Planner account
        </Text>

        <VStack gap="15px">

          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            onClick={handleRegister}
          >
            Register
          </Button>
          <Text
            textAlign="center"
            mt="20px"
            color="gray.500"
          >
            Already have an account?{" "}

            <Button
              variant="plain"
              colorPalette="blue"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Text>

        </VStack>
      </Box>
    </Box>
  );
}

export default Register;