import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <Box minH="100vh" bg="gray.50">

            {/* Header */}
            <Flex
                bg="blue.600"
                color="white"
                px="40px"
                py="20px"
                justify="space-between"
                align="center"
            >
                <Heading size="lg">
                    📚 Study Planner
                </Heading>

                <Flex gap="10px">
                    <Button
                        colorPalette="whiteAlpha"
                        variant="ghost"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </Button>

                    <Button
                        colorPalette="whiteAlpha"
                        onClick={() => navigate("/register")}
                    >
                        Create Account
                    </Button>
                </Flex>
            </Flex>


            <Flex
                minH="80vh"
                direction="column"
                justify="center"
                align="center"
                textAlign="center"
                px="20px"
            >

                <Heading
                    size="3xl"
                    maxW="800px"
                >
                    Plan Your Studies.
                    <br />
                    Achieve Your Goals. 🎯
                </Heading>

                <Text
                    mt="20px"
                    fontSize="xl"
                    color="gray.600"
                    maxW="650px"
                >
                    Organize your subjects, manage your
                    tasks, track your progress, and stay
                    consistent with your studies.
                </Text>

                <Flex
                    gap="15px"
                    mt="30px"
                >

                    <Button
                        size="lg"
                        colorPalette="blue"
                        onClick={() =>
                            navigate("/register")
                        }
                    >
                        Get Started 🚀
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Login
                    </Button>

                </Flex>

            </Flex>

        </Box>
    );
}

export default Home;