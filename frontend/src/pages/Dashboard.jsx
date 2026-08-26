import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

import {
    Box,
    Button,
    Flex,
    Grid,
    Heading,
    Text,
    VStack,
} from "@chakra-ui/react";

function Dashboard() {
    const [subjects, setSubjects] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:5000/api/subjects",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setSubjects(response.data);
            } catch (error) {
                console.error(
                    "Failed to fetch subjects:",
                    error
                );
            }
        };

        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:5000/api/tasks",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setTasks(response.data);
            } catch (error) {
                console.error(
                    "Failed to fetch tasks:",
                    error
                );
            }
        };

        fetchSubjects();
        fetchTasks();
    }, []);



    const totalSubjects = subjects.length;

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.status === "completed"
    ).length;

    const pendingTasks = tasks.filter(
        (task) => task.status === "pending"
    ).length;

    const progress =
        totalTasks === 0
            ? 0
            : Math.round(
                (completedTasks / totalTasks) * 100
            );



    const today = new Date();

    const todaysTasks = tasks.filter((task) => {
        if (!task.dueDate) {
            return false;
        }

        const taskDate = new Date(task.dueDate);

        return (
            taskDate.getFullYear() ===
                today.getFullYear() &&
            taskDate.getMonth() ===
                today.getMonth() &&
            taskDate.getDate() ===
                today.getDate()
        );
    });


    return (
        <Box
            minH="100vh"
            bg="linear-gradient(135deg, #f8f7ff 0%, #eef2ff 100%)"
        >


            <Navbar />



            <Box
                maxW="1250px"
                mx="auto"
                px={{
                    base: "20px",
                    md: "35px",
                    lg: "45px",
                }}
                py={{
                    base: "30px",
                    md: "40px",
                }}
            >


                <Flex
                    justify="space-between"
                    align={{
                        base: "flex-start",
                        md: "center",
                    }}
                    direction={{
                        base: "column",
                        md: "row",
                    }}
                    gap="20px"
                >

                    <Box>

                        <Text
                            color="purple.600"
                            fontWeight="bold"
                            mb="5px"
                        >
                            📚 STUDY OVERVIEW
                        </Text>

                        <Heading
                            fontSize={{
                                base: "30px",
                                md: "40px",
                            }}
                        >
                            Welcome back! 👋
                        </Heading>

                        <Text
                            mt="8px"
                            color="gray.600"
                        >
                            Let's plan your studies and
                            achieve your goals.
                        </Text>

                    </Box>


                    <Button
                        colorPalette="purple"
                        size="lg"
                        onClick={() =>
                            window.location.href =
                                "/tasks"
                        }
                    >
                        + Add Task
                    </Button>

                </Flex>



                <Grid
                    templateColumns={{
                        base: "1fr",
                        sm: "repeat(2, 1fr)",
                        lg: "repeat(4, 1fr)",
                    }}
                    gap="20px"
                    mt="35px"
                >


                    <Box
                        bg="white"
                        p="25px"
                        borderRadius="20px"
                        boxShadow="md"
                        borderTop="4px solid"
                        borderColor="purple.500"
                        transition="0.2s"
                        _hover={{
                            transform:
                                "translateY(-4px)",
                            boxShadow: "lg",
                        }}
                    >

                        <Flex
                            justify="space-between"
                            align="center"
                        >

                            <Box>

                                <Text
                                    color="gray.500"
                                    fontSize="sm"
                                    fontWeight="medium"
                                >
                                    Total Subjects
                                </Text>

                                <Heading
                                    mt="8px"
                                    fontSize="35px"
                                >
                                    {totalSubjects}
                                </Heading>

                            </Box>

                            <Text fontSize="40px">
                                📚
                            </Text>

                        </Flex>

                    </Box>



                    <Box
                        bg="white"
                        p="25px"
                        borderRadius="20px"
                        boxShadow="md"
                        borderTop="4px solid"
                        borderColor="blue.500"
                        transition="0.2s"
                        _hover={{
                            transform:
                                "translateY(-4px)",
                            boxShadow: "lg",
                        }}
                    >

                        <Flex
                            justify="space-between"
                            align="center"
                        >

                            <Box>

                                <Text
                                    color="gray.500"
                                    fontSize="sm"
                                    fontWeight="medium"
                                >
                                    Total Tasks
                                </Text>

                                <Heading
                                    mt="8px"
                                    fontSize="35px"
                                >
                                    {totalTasks}
                                </Heading>

                            </Box>

                            <Text fontSize="40px">
                                📝
                            </Text>

                        </Flex>

                    </Box>



                    <Box
                        bg="white"
                        p="25px"
                        borderRadius="20px"
                        boxShadow="md"
                        borderTop="4px solid"
                        borderColor="green.500"
                        transition="0.2s"
                        _hover={{
                            transform:
                                "translateY(-4px)",
                            boxShadow: "lg",
                        }}
                    >

                        <Flex
                            justify="space-between"
                            align="center"
                        >

                            <Box>

                                <Text
                                    color="gray.500"
                                    fontSize="sm"
                                    fontWeight="medium"
                                >
                                    Completed
                                </Text>

                                <Heading
                                    mt="8px"
                                    fontSize="35px"
                                >
                                    {completedTasks}
                                </Heading>

                            </Box>

                            <Text fontSize="40px">
                                ✅
                            </Text>

                        </Flex>

                    </Box>



                    <Box
                        bg="white"
                        p="25px"
                        borderRadius="20px"
                        boxShadow="md"
                        borderTop="4px solid"
                        borderColor="orange.400"
                        transition="0.2s"
                        _hover={{
                            transform:
                                "translateY(-4px)",
                            boxShadow: "lg",
                        }}
                    >

                        <Flex
                            justify="space-between"
                            align="center"
                        >

                            <Box>

                                <Text
                                    color="gray.500"
                                    fontSize="sm"
                                    fontWeight="medium"
                                >
                                    Pending
                                </Text>

                                <Heading
                                    mt="8px"
                                    fontSize="35px"
                                >
                                    {pendingTasks}
                                </Heading>

                            </Box>

                            <Text fontSize="40px">
                                ⏳
                            </Text>

                        </Flex>

                    </Box>

                </Grid>



                <Grid
                    templateColumns={{
                        base: "1fr",
                        lg: "1fr 1fr",
                    }}
                    gap="20px"
                    mt="25px"
                >


                    <Box
                        bg="white"
                        p="30px"
                        borderRadius="20px"
                        boxShadow="md"
                    >

                        <Flex
                            justify="space-between"
                            align="center"
                        >

                            <Box>

                                <Heading size="md">
                                    Study Progress
                                </Heading>

                                <Text
                                    color="gray.500"
                                    mt="5px"
                                >
                                    Keep going, you're doing
                                    great!
                                </Text>

                            </Box>

                            <Heading
                                color="purple.600"
                                fontSize="35px"
                            >
                                {progress}%
                            </Heading>

                        </Flex>



                        <Box
                            mt="25px"
                            h="14px"
                            bg="gray.100"
                            borderRadius="full"
                            overflow="hidden"
                        >

                            <Box
                                h="100%"
                                w={`${progress}%`}
                                bg="linear-gradient(90deg, #7c3aed, #a855f7)"
                                borderRadius="full"
                                transition="width 0.5s"
                            />

                        </Box>


                        <Flex
                            justify="space-between"
                            mt="10px"
                        >

                            <Text
                                fontSize="sm"
                                color="gray.500"
                            >
                                {completedTasks} completed
                            </Text>

                            <Text
                                fontSize="sm"
                                color="gray.500"
                            >
                                {totalTasks} total
                            </Text>

                        </Flex>

                    </Box>



                    <Box
                        bg="white"
                        p="30px"
                        borderRadius="20px"
                        boxShadow="md"
                    >

                        <Heading size="md">
                            Quick Summary
                        </Heading>

                        <VStack
                            align="stretch"
                            mt="20px"
                            gap="12px"
                        >

                            <Flex
                                justify="space-between"
                                p="14px"
                                bg="purple.50"
                                borderRadius="12px"
                            >

                                <Text>
                                    📚 Subjects
                                </Text>

                                <Text
                                    fontWeight="bold"
                                    color="purple.600"
                                >
                                    {totalSubjects}
                                </Text>

                            </Flex>


                            <Flex
                                justify="space-between"
                                p="14px"
                                bg="green.50"
                                borderRadius="12px"
                            >

                                <Text>
                                    ✅ Completed
                                </Text>

                                <Text
                                    fontWeight="bold"
                                    color="green.600"
                                >
                                    {completedTasks}
                                </Text>

                            </Flex>


                            <Flex
                                justify="space-between"
                                p="14px"
                                bg="orange.50"
                                borderRadius="12px"
                            >

                                <Text>
                                    ⏳ Pending
                                </Text>

                                <Text
                                    fontWeight="bold"
                                    color="orange.600"
                                >
                                    {pendingTasks}
                                </Text>

                            </Flex>

                        </VStack>

                    </Box>

                </Grid>



                <Box
                    bg="white"
                    p={{
                        base: "20px",
                        md: "30px",
                    }}
                    mt="25px"
                    borderRadius="20px"
                    boxShadow="md"
                >

                    <Flex
                        justify="space-between"
                        align="center"
                        mb="20px"
                    >

                        <Box>

                            <Heading size="md">
                                Today's Tasks 📅
                            </Heading>

                            <Text
                                color="gray.500"
                                mt="5px"
                            >
                                Tasks scheduled for today
                            </Text>

                        </Box>

                        <Button
                            variant="outline"
                            colorPalette="purple"
                            onClick={() =>
                                window.location.href =
                                    "/tasks"
                            }
                        >
                            View All
                        </Button>

                    </Flex>


                    <VStack
                        align="stretch"
                        gap="12px"
                    >

                        {todaysTasks.length === 0 ? (

                            <Box
                                textAlign="center"
                                py="40px"
                                bg="gray.50"
                                borderRadius="15px"
                            >

                                <Text fontSize="45px">
                                    🎉
                                </Text>

                                <Heading
                                    size="sm"
                                    mt="10px"
                                >
                                    No tasks due today!
                                </Heading>

                                <Text
                                    color="gray.500"
                                    mt="5px"
                                >
                                    Enjoy your free time or
                                    plan something new.
                                </Text>

                            </Box>

                        ) : (

                            todaysTasks.map((task) => (

                                <Flex
                                    key={task._id}
                                    justify="space-between"
                                    align="center"
                                    gap="15px"
                                    p="18px"
                                    bg="gray.50"
                                    borderRadius="14px"
                                    borderLeft="5px solid"
                                    borderColor={
                                        task.status ===
                                        "completed"
                                            ? "green.400"
                                            : "orange.400"
                                    }
                                    transition="0.2s"
                                    _hover={{
                                        bg: "purple.50",
                                    }}
                                >

                                    <Box>

                                        <Text
                                            fontWeight="bold"
                                        >
                                            {task.title}
                                        </Text>

                                        <Text
                                            fontSize="sm"
                                            color="gray.500"
                                            mt="5px"
                                        >
                                            📚{" "}
                                            {task.subjectId
                                                ?.name ||
                                                "No subject"}
                                        </Text>

                                    </Box>


                                    <Box
                                        px="12px"
                                        py="6px"
                                        borderRadius="full"
                                        bg={
                                            task.status ===
                                            "completed"
                                                ? "green.100"
                                                : "orange.100"
                                        }
                                    >

                                        <Text
                                            fontSize="sm"
                                            fontWeight="bold"
                                            color={
                                                task.status ===
                                                "completed"
                                                    ? "green.600"
                                                    : "orange.600"
                                            }
                                        >
                                            {task.status ===
                                            "completed"
                                                ? "✓ Completed"
                                                : "○ Pending"}
                                        </Text>

                                    </Box>

                                </Flex>

                            ))

                        )}

                    </VStack>

                </Box>

            </Box>

        </Box>
    );
}

export default Dashboard;