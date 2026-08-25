import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
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
                console.error("Failed to fetch subjects:", error);
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
            taskDate.getFullYear() === today.getFullYear() &&
            taskDate.getMonth() === today.getMonth() &&
            taskDate.getDate() === today.getDate()
        );
    });

    return (
        <Box minH="100vh" bg="gray.50">

            <Navbar />

            <Box
                p={{
                    base: "20px",
                    md: "30px",
                    lg: "40px",
                }}
            >

                <Heading size="xl">
                    Welcome back! 👋
                </Heading>

                <Text mt="8px" color="gray.600">
                    Let's plan your studies and achieve your goals.
                </Text>

                <Grid
                    templateColumns={{
                        base: "1fr",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                    }}
                    gap="20px"
                    mt="30px"
                >

                    <Box
                        bg="white"
                        p="25px"
                        borderRadius="12px"
                        shadow="sm"
                    >
                        <Text color="gray.500">
                            Total Subjects
                        </Text>

                        <Heading mt="10px">
                            {subjects.length}
                        </Heading>
                    </Box>

                    <Box
                        bg="white"
                        p="25px"
                        borderRadius="12px"
                        shadow="sm"
                    >
                        <Text color="gray.500">
                            Total Tasks
                        </Text>

                        <Heading mt="10px">
                            {totalTasks}
                        </Heading>
                    </Box>

                    <Box
                        bg="white"
                        p="25px"
                        borderRadius="12px"
                        shadow="sm"
                    >
                        <Text color="gray.500">
                            Study Progress
                        </Text>

                        <Heading mt="10px">
                            {progress}%
                        </Heading>
                    </Box>

                </Grid>

                <Box
                    bg="white"
                    p="30px"
                    mt="30px"
                    borderRadius="12px"
                    shadow="sm"
                >
                    <Heading size="md">
                        Today's Tasks
                    </Heading>

                    <VStack align="stretch" mt="20px" gap="12px">

                        {todaysTasks.length === 0 ? (
                            <Text color="gray.500">
                                No tasks due today.
                            </Text>
                        ) : (
                            todaysTasks.map((task) => (
                                <Flex
                                    key={task._id}
                                    justify="space-between"
                                    align="center"
                                    p="15px"
                                    bg="gray.50"
                                    borderRadius="8px"
                                >
                                    <Box>
                                        <Text fontWeight="medium">
                                            {task.title}
                                        </Text>

                                        <Text
                                            fontSize="sm"
                                            color="gray.500"
                                        >
                                            📚 {task.subjectId?.name || "No subject"}
                                        </Text>
                                    </Box>

                                    <Text
                                        color={
                                            task.status === "completed"
                                                ? "green.500"
                                                : "orange.500"
                                        }
                                    >
                                        {task.status === "completed"
                                            ? "Completed"
                                            : "Pending"}
                                    </Text>
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