import {
    Box,
    Button,
    Flex,
    Grid,
    Heading,
    Text,
    VStack,
} from "@chakra-ui/react";

import { Navigate, useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <Box
            minH="100vh"
            bg="linear-gradient(135deg, #f8f7ff 0%, #eef2ff 100%)"
            color="gray.800"
        >

            <Flex
                px={{ base: "20px", md: "60px" }}
                py="18px"
                justify="space-between"
                align="center"
                bg="white"
                boxShadow="sm"
                position="sticky"
                top="0"
                zIndex="10"
            >

                <Flex
                    align="center"
                    gap="10px"
                >
                    <Text fontSize="28px">
                        📚
                    </Text>

                    <Heading size="md">
                        Study Planner
                    </Heading>
                </Flex>


                <Flex
                    gap="30px"
                    align="center"
                    display={{ base: "none", md: "flex" }}
                >
                    <Text
                        fontWeight="bold"
                        color="purple.600"
                        cursor="pointer"
                    >
                        Home
                    </Text>

                    <Text
                        cursor="pointer"
                        color="gray.600"
                    >
                        Features
                    </Text>

                    <Text
                        cursor="pointer"
                        color="gray.600"
                    >
                        About
                    </Text>

                    <Text
                        cursor="pointer"
                        color="gray.600"
                    >
                        Contact
                    </Text>
                </Flex>


                <Flex gap="10px">

                    <Button
                        variant="outline"
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Login
                    </Button>

                    <Button
                        colorPalette="purple"
                        onClick={() =>
                            navigate("/register")
                        }
                    >
                        Get Started
                    </Button>

                </Flex>

            </Flex>



            <Grid
                templateColumns={{
                    base: "1fr",
                    md: "1fr 1fr",
                }}
                gap="50px"
                maxW="1200px"
                mx="auto"
                px={{ base: "25px", md: "50px" }}
                py={{ base: "60px", md: "100px" }}
                alignItems="center"
            >


                <VStack
                    align="start"
                    gap="20px"
                >

                    <Text
                        color="purple.600"
                        fontWeight="bold"
                        fontSize="lg"
                    >
                        🎓 Your Personal Study Companion
                    </Text>


                    <Heading
                        fontSize={{
                            base: "45px",
                            md: "65px",
                        }}
                        lineHeight="1.05"
                    >
                        Plan{" "}

                        <Text
                            as="span"
                            color="purple.600"
                        >
                            Smarter.
                        </Text>

                        <br />

                        Study{" "}

                        <Text
                            as="span"
                            color="purple.600"
                        >
                            Better.
                        </Text>
                    </Heading>


                    <Text
                        fontSize="lg"
                        color="gray.600"
                        maxW="540px"
                    >
                        Your all-in-one study companion to
                        organize subjects, manage tasks,
                        track progress, and achieve your
                        academic goals.
                    </Text>



                    <Flex
                        gap="15px"
                        flexWrap="wrap"
                        pt="10px"
                    >

                        <Button
                            size="lg"
                            colorPalette="purple"
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

                </VStack>



                <Box
                    display="flex"
                    justifyContent="center"
                >

                    <Box
                        w="100%"
                        maxW="500px"
                        h={{
                            base: "350px",
                            md: "430px",
                        }}
                        bg="linear-gradient(135deg, #ddd6fe, #c4b5fd)"
                        borderRadius="35px"
                        position="relative"
                        overflow="hidden"
                        boxShadow="0 25px 60px rgba(99, 102, 241, 0.25)"
                    >


                        <Box
                            position="absolute"
                            w="180px"
                            h="180px"
                            borderRadius="full"
                            bg="purple.300"
                            opacity="0.4"
                            top="-50px"
                            right="-50px"
                        />

                        <Box
                            position="absolute"
                            w="150px"
                            h="150px"
                            borderRadius="full"
                            bg="blue.300"
                            opacity="0.4"
                            bottom="-40px"
                            left="-40px"
                        />



                        <Text
                            position="absolute"
                            fontSize={{
                                base: "100px",
                                md: "130px",
                            }}
                            left="50%"
                            top="50%"
                            transform="translate(-50%, -50%)"
                        >
                            👨‍💻
                        </Text>



                        <Text
                            position="absolute"
                            fontSize="60px"
                            bottom="30px"
                            left="45px"
                        >
                            📚
                        </Text>



                        <Text
                            position="absolute"
                            fontSize="55px"
                            top="40px"
                            left="40px"
                        >
                            📊
                        </Text>



                        <Text
                            position="absolute"
                            fontSize="55px"
                            bottom="45px"
                            right="45px"
                        >
                            ✅
                        </Text>



                        <Box
                            position="absolute"
                            top="55px"
                            right="25px"
                            bg="white"
                            p="18px"
                            borderRadius="18px"
                            boxShadow="xl"
                            w="190px"
                        >

                            <Text
                                fontWeight="bold"
                                fontSize="sm"
                                mb="8px"
                            >
                                Today's Tasks
                            </Text>

                            <Text
                                fontSize="sm"
                                color="green.500"
                            >
                                ✓ React Project
                            </Text>

                            <Text
                                fontSize="sm"
                                color="orange.500"
                            >
                                ○ Study Java
                            </Text>

                            <Text
                                fontSize="sm"
                                color="purple.500"
                            >
                                ○ Practice Python
                            </Text>

                        </Box>

                    </Box>

                </Box>

            </Grid>



            <Box
                maxW="1150px"
                mx="auto"
                px="25px"
                pb="80px"
            >

                <Grid
                    templateColumns={{
                        base: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(4, 1fr)",
                    }}
                    gap="20px"
                >


                    <Box
                        bg="white"
                        p="25px"
                        borderRadius="20px"
                        boxShadow="md"
                        transition="0.2s"
                        _hover={{
                            transform: "translateY(-5px)",
                            boxShadow: "lg",
                        }}
                    >

                        <Text fontSize="38px">
                            📚
                        </Text>

                        <Heading
                            size="sm"
                            mt="15px"
                        >
                            Organize Subjects
                        </Heading>

                        <Text
                            mt="8px"
                            color="gray.500"
                            fontSize="sm"
                        >
                            Keep all your subjects
                            organized in one place.
                        </Text>

                    </Box>



                    <Box
                        bg="white"
                        p="25px"
                        borderRadius="20px"
                        boxShadow="md"
                        transition="0.2s"
                        _hover={{
                            transform: "translateY(-5px)",
                            boxShadow: "lg",
                        }}
                    >

                        <Text fontSize="38px">
                            📝
                        </Text>

                        <Heading
                            size="sm"
                            mt="15px"
                        >
                            Manage Tasks
                        </Heading>

                        <Text
                            mt="8px"
                            color="gray.500"
                            fontSize="sm"
                        >
                            Create tasks, set priorities,
                            and manage deadlines.
                        </Text>

                    </Box>



                    <Box
                        bg="white"
                        p="25px"
                        borderRadius="20px"
                        boxShadow="md"
                        transition="0.2s"
                        _hover={{
                            transform: "translateY(-5px)",
                            boxShadow: "lg",
                        }}
                    >

                        <Text fontSize="38px">
                            📈
                        </Text>

                        <Heading
                            size="sm"
                            mt="15px"
                        >
                            Track Progress
                        </Heading>

                        <Text
                            mt="8px"
                            color="gray.500"
                            fontSize="sm"
                        >
                            Monitor completed tasks
                            and study progress.
                        </Text>

                    </Box>



                    <Box
                        bg="white"
                        p="25px"
                        borderRadius="20px"
                        boxShadow="md"
                        transition="0.2s"
                        _hover={{
                            transform: "translateY(-5px)",
                            boxShadow: "lg",
                        }}
                    >

                        <Text fontSize="38px">
                            🎯
                        </Text>

                        <Heading
                            size="sm"
                            mt="15px"
                        >
                            Achieve Goals
                        </Heading>

                        <Text
                            mt="8px"
                            color="gray.500"
                            fontSize="sm"
                        >
                            Stay consistent and achieve
                            your study goals.
                        </Text>

                    </Box>

                </Grid>

            </Box>

        </Box>
    );
}

export default Home;