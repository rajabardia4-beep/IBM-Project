import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

import {
    Box,
    Button,
    Dialog,
    Field,
    Flex,
    Heading,
    Input,
    SimpleGrid,
    Text,
    Textarea,
} from "@chakra-ui/react";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [filter, setFilter] = useState("all");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [editSaving, setEditSaving] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState("");
    const [subjectId, setSubjectId] = useState("");



    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/api/tasks");

            setTasks(response.data);

        } catch (error) {
            console.error(
                "Failed to load tasks:",
                error
            );

        } finally {
            setLoading(false);
        }
    };



    const fetchSubjects = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/api/subjects");

            setSubjects(response.data);

        } catch (error) {
            console.error(
                "Failed to load subjects:",
                error
            );
        }
    };


    useEffect(() => {
        fetchTasks();
        fetchSubjects();
    }, []);



    const filteredTasks = tasks.filter((task) => {

        if (filter === "pending") {
            return task.status === "pending";
        }

        if (filter === "completed") {
            return task.status === "completed";
        }

        return true;
    });



    const handleAddTask = async () => {

        if (!title.trim()) {
            alert("Please enter a task title");
            return;
        }

        if (!subjectId) {
            alert("Please select a subject");
            return;
        }

        try {
            setSaving(true);

            const token =
                localStorage.getItem("token");
            const response = await api.post(
                "/api/tasks",
                {
                    title,
                    description,
                    priority,
                    dueDate: dueDate || null,
                    subjectId,
                }
            );

            setTasks((prev) => [
                response.data,
                ...prev,
            ]);

            resetForm();

            setIsOpen(false);

        } catch (error) {

            console.error(
                "Add task error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to create task"
            );

        } finally {
            setSaving(false);
        }
    };



    const handleUpdateTask = async () => {

        if (!title.trim()) {
            alert("Please enter a task title");
            return;
        }

        if (!subjectId) {
            alert("Please select a subject");
            return;
        }

        try {
            setEditSaving(true);

            const token =
                localStorage.getItem("token");

            const response = await api.put(
                `/api/tasks/${editingTask._id}`,
                {
                    title,
                    description,
                    priority,
                    dueDate: dueDate || null,
                    subjectId,
                }
            );

            setTasks((prev) =>
                prev.map((task) =>
                    task._id === editingTask._id
                        ? response.data
                        : task
                )
            );

            resetForm();

            setIsOpen(false);

            alert("Task updated successfully!");

        } catch (error) {

            console.error(
                "Update task error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to update task"
            );

        } finally {
            setEditSaving(false);
        }
    };



    const handleEditTask = (task) => {

        setEditingTask(task);

        setTitle(task.title || "");

        setDescription(
            task.description || ""
        );

        setPriority(
            task.priority || "medium"
        );

        setDueDate(
            task.dueDate
                ? task.dueDate.substring(0, 10)
                : ""
        );

        setSubjectId(
            task.subjectId?._id ||
            task.subjectId ||
            ""
        );

        setIsOpen(true);
    };



    const handleCompleteTask = async (task) => {

        try {

            const token =
                localStorage.getItem("token");

            const newStatus =
                task.status === "completed"
                    ? "pending"
                    : "completed";

            const response = await api.put(
                `/api/tasks/${task._id}`,
                {
                    status: newStatus,
                }
            );

            setTasks((prev) =>
                prev.map((item) =>
                    item._id === task._id
                        ? response.data
                        : item
                )
            );

        } catch (error) {

            console.error(
                "Update task error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to update task"
            );
        }
    };



    const handleDeleteTask = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this task?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            const token =
                localStorage.getItem("token");

            await api.delete(
                `/api/tasks/${id}`
            );

            setTasks((prev) =>
                prev.filter(
                    (task) =>
                        task._id !== id
                )
            );

            alert(
                "Task deleted successfully!"
            );

        } catch (error) {

            console.error(
                "Delete task error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete task"
            );
        }
    };



    const resetForm = () => {

        setTitle("");
        setDescription("");
        setPriority("medium");
        setDueDate("");
        setSubjectId("");

        setEditingTask(null);
    };



    const openAddDialog = () => {

        resetForm();

        setIsOpen(true);
    };



    const getPriorityColor = (priority) => {

        if (priority === "high") {
            return "red";
        }

        if (priority === "medium") {
            return "orange";
        }

        return "green";
    };


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
                    mb="30px"
                >

                    <Box>

                        <Text
                            color="purple.600"
                            fontWeight="bold"
                            mb="5px"
                        >
                            📝 STUDY MANAGEMENT
                        </Text>

                        <Heading
                            fontSize={{
                                base: "30px",
                                md: "40px",
                            }}
                        >
                            My Tasks
                        </Heading>

                        <Text
                            color="gray.600"
                            mt="8px"
                        >
                            Plan your work, stay organized,
                            and get things done.
                        </Text>

                    </Box>


                    <Button
                        size="lg"
                        colorPalette="purple"
                        onClick={openAddDialog}
                    >
                        + Add Task
                    </Button>

                </Flex>



                <SimpleGrid
                    columns={{
                        base: 1,
                        sm: 3,
                    }}
                    gap="15px"
                    mb="25px"
                >

                    <Box
                        bg="white"
                        p="18px"
                        borderRadius="15px"
                        boxShadow="sm"
                    >

                        <Text
                            fontSize="sm"
                            color="gray.500"
                        >
                            All Tasks
                        </Text>

                        <Heading
                            mt="5px"
                            color="purple.600"
                        >
                            {tasks.length}
                        </Heading>

                    </Box>


                    <Box
                        bg="white"
                        p="18px"
                        borderRadius="15px"
                        boxShadow="sm"
                    >

                        <Text
                            fontSize="sm"
                            color="gray.500"
                        >
                            Pending
                        </Text>

                        <Heading
                            mt="5px"
                            color="orange.500"
                        >
                            {
                                tasks.filter(
                                    (task) =>
                                        task.status ===
                                        "pending"
                                ).length
                            }
                        </Heading>

                    </Box>


                    <Box
                        bg="white"
                        p="18px"
                        borderRadius="15px"
                        boxShadow="sm"
                    >

                        <Text
                            fontSize="sm"
                            color="gray.500"
                        >
                            Completed
                        </Text>

                        <Heading
                            mt="5px"
                            color="green.500"
                        >
                            {
                                tasks.filter(
                                    (task) =>
                                        task.status ===
                                        "completed"
                                ).length
                            }
                        </Heading>

                    </Box>

                </SimpleGrid>



                <Flex
                    gap="10px"
                    mb="25px"
                    flexWrap="wrap"
                >

                    <Button
                        variant={
                            filter === "all"
                                ? "solid"
                                : "outline"
                        }
                        colorPalette="purple"
                        onClick={() =>
                            setFilter("all")
                        }
                    >
                        All Tasks
                    </Button>


                    <Button
                        variant={
                            filter === "pending"
                                ? "solid"
                                : "outline"
                        }
                        colorPalette="orange"
                        onClick={() =>
                            setFilter("pending")
                        }
                    >
                        ⏳ Pending
                    </Button>


                    <Button
                        variant={
                            filter === "completed"
                                ? "solid"
                                : "outline"
                        }
                        colorPalette="green"
                        onClick={() =>
                            setFilter("completed")
                        }
                    >
                        ✓ Completed
                    </Button>

                </Flex>



                {loading ? (

                    <Box
                        bg="white"
                        p="50px"
                        borderRadius="20px"
                        textAlign="center"
                    >

                        <Text fontSize="40px">
                            📝
                        </Text>

                        <Text
                            color="gray.500"
                            mt="10px"
                        >
                            Loading your tasks...
                        </Text>

                    </Box>

                ) : filteredTasks.length === 0 ? (

                    <Box
                        bg="white"
                        p={{
                            base: "40px 20px",
                            md: "70px",
                        }}
                        borderRadius="25px"
                        textAlign="center"
                        boxShadow="sm"
                    >

                        <Text fontSize="60px">
                            🎉
                        </Text>

                        <Heading
                            size="md"
                            mt="15px"
                        >
                            {filter === "pending"
                                ? "No pending tasks!"
                                : filter === "completed"
                                    ? "No completed tasks yet!"
                                    : "No tasks yet!"}
                        </Heading>

                        <Text
                            color="gray.500"
                            mt="8px"
                        >
                            {filter === "all"
                                ? "Create your first study task and start making progress."
                                : "You're all caught up here."}
                        </Text>

                        {filter === "all" && (
                            <Button
                                mt="25px"
                                colorPalette="purple"
                                onClick={
                                    openAddDialog
                                }
                            >
                                + Create Your First Task
                            </Button>
                        )}

                    </Box>

                ) : (

                    <SimpleGrid
                        columns={{
                            base: 1,
                            md: 2,
                            lg: 3,
                        }}
                        gap="22px"
                    >

                        {filteredTasks.map((task) => {

                            const priorityColor =
                                getPriorityColor(
                                    task.priority
                                );

                            const completed =
                                task.status ===
                                "completed";

                            return (

                                <Box
                                    key={task._id}
                                    bg="white"
                                    borderRadius="20px"
                                    overflow="hidden"
                                    boxShadow="md"
                                    transition="0.2s"
                                    opacity={
                                        completed
                                            ? 0.85
                                            : 1
                                    }
                                    _hover={{
                                        transform:
                                            "translateY(-5px)",
                                        boxShadow:
                                            "xl",
                                    }}
                                >


                                    <Box
                                        h="7px"
                                        bg={
                                            completed
                                                ? "green.400"
                                                : `${priorityColor}.500`
                                        }
                                    />


                                    <Box p="25px">


                                        <Flex
                                            justify="space-between"
                                            align="start"
                                            gap="10px"
                                        >

                                            <Heading
                                                size="md"
                                                textDecoration={
                                                    completed
                                                        ? "line-through"
                                                        : "none"
                                                }
                                            >
                                                {task.title}
                                            </Heading>


                                            <Text
                                                fontSize="sm"
                                                px="10px"
                                                py="4px"
                                                borderRadius="full"
                                                bg={
                                                    completed
                                                        ? "green.100"
                                                        : "orange.100"
                                                }
                                                color={
                                                    completed
                                                        ? "green.600"
                                                        : "orange.600"
                                                }
                                                fontWeight="bold"
                                                whiteSpace="nowrap"
                                            >
                                                {completed
                                                    ? "✓ Done"
                                                    : "○ Pending"}
                                            </Text>

                                        </Flex>



                                        <Text
                                            mt="12px"
                                            color="gray.500"
                                            minH="45px"
                                            lineHeight="1.6"
                                        >
                                            {task.description ||
                                                "No description added."}
                                        </Text>



                                        <Box
                                            mt="18px"
                                            p="10px 12px"
                                            bg="purple.50"
                                            borderRadius="10px"
                                        >

                                            <Text
                                                fontSize="sm"
                                                color="purple.700"
                                                fontWeight="medium"
                                            >
                                                📚{" "}
                                                {task
                                                    .subjectId
                                                    ?.name ||
                                                    "No subject"}
                                            </Text>

                                        </Box>



                                        <Flex
                                            gap="8px"
                                            flexWrap="wrap"
                                            mt="15px"
                                        >

                                            <Text
                                                fontSize="sm"
                                                px="10px"
                                                py="5px"
                                                borderRadius="full"
                                                bg={`${priorityColor}.100`}
                                                color={`${priorityColor}.600`}
                                                fontWeight="medium"
                                            >
                                                ⭐{" "}
                                                {task.priority}
                                            </Text>


                                            {task.dueDate && (

                                                <Text
                                                    fontSize="sm"
                                                    px="10px"
                                                    py="5px"
                                                    borderRadius="full"
                                                    bg="blue.50"
                                                    color="blue.600"
                                                    fontWeight="medium"
                                                >
                                                    📅{" "}
                                                    {new Date(
                                                        task.dueDate
                                                    ).toLocaleDateString()}
                                                </Text>

                                            )}

                                        </Flex>



                                        <Flex
                                            gap="8px"
                                            mt="22px"
                                            pt="18px"
                                            borderTop="1px solid"
                                            borderColor="gray.100"
                                            flexWrap="wrap"
                                        >

                                            <Button
                                                size="sm"
                                                colorPalette="purple"
                                                variant="outline"
                                                onClick={() =>
                                                    handleEditTask(
                                                        task
                                                    )
                                                }
                                            >
                                                ✏️ Edit
                                            </Button>


                                            <Button
                                                size="sm"
                                                colorPalette={
                                                    completed
                                                        ? "orange"
                                                        : "green"
                                                }
                                                onClick={() =>
                                                    handleCompleteTask(
                                                        task
                                                    )
                                                }
                                            >
                                                {completed
                                                    ? "↩️ Pending"
                                                    : "✅ Complete"}
                                            </Button>


                                            <Button
                                                size="sm"
                                                colorPalette="red"
                                                variant="outline"
                                                onClick={() =>
                                                    handleDeleteTask(
                                                        task._id
                                                    )
                                                }
                                            >
                                                🗑️
                                            </Button>

                                        </Flex>

                                    </Box>

                                </Box>

                            );
                        })}

                    </SimpleGrid>

                )}



                <Dialog.Root
                    open={isOpen}
                    onOpenChange={(e) => {

                        setIsOpen(e.open);

                        if (!e.open) {
                            resetForm();
                        }

                    }}
                >

                    <Dialog.Backdrop />

                    <Dialog.Positioner>

                        <Dialog.Content
                            borderRadius="20px"
                        >

                            <Dialog.Header>

                                <Dialog.Title
                                    fontSize="xl"
                                >
                                    {editingTask
                                        ? "✏️ Edit Task"
                                        : "📝 Add New Task"}
                                </Dialog.Title>

                            </Dialog.Header>


                            <Dialog.Body>


                                <Field.Root>

                                    <Field.Label>
                                        Task Title
                                    </Field.Label>

                                    <Input
                                        size="lg"
                                        placeholder="e.g. Learn React Hooks"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(
                                                e.target.value
                                            )
                                        }
                                    />

                                </Field.Root>



                                <Field.Root mt="20px">

                                    <Field.Label>
                                        Description
                                    </Field.Label>

                                    <Textarea
                                        placeholder="What do you need to study?"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(
                                                e.target.value
                                            )
                                        }
                                    />

                                </Field.Root>



                                <Field.Root mt="20px">

                                    <Field.Label>
                                        Subject
                                    </Field.Label>

                                    <select
                                        value={subjectId}
                                        onChange={(e) =>
                                            setSubjectId(
                                                e.target.value
                                            )
                                        }
                                        style={{
                                            width: "100%",
                                            padding: "12px",
                                            borderRadius: "8px",
                                            border: "1px solid #CBD5E0",
                                            background: "white",
                                        }}
                                    >

                                        <option value="">
                                            Select a subject
                                        </option>

                                        {subjects.map(
                                            (subject) => (

                                                <option
                                                    key={
                                                        subject._id
                                                    }
                                                    value={
                                                        subject._id
                                                    }
                                                >
                                                    {subject.name}
                                                </option>

                                            )
                                        )}

                                    </select>

                                </Field.Root>



                                <Field.Root mt="20px">

                                    <Field.Label>
                                        Priority
                                    </Field.Label>

                                    <select
                                        value={priority}
                                        onChange={(e) =>
                                            setPriority(
                                                e.target.value
                                            )
                                        }
                                        style={{
                                            width: "100%",
                                            padding: "12px",
                                            borderRadius: "8px",
                                            border: "1px solid #CBD5E0",
                                            background: "white",
                                        }}
                                    >

                                        <option value="low">
                                            🟢 Low
                                        </option>

                                        <option value="medium">
                                            🟡 Medium
                                        </option>

                                        <option value="high">
                                            🔴 High
                                        </option>

                                    </select>

                                </Field.Root>



                                <Field.Root mt="20px">

                                    <Field.Label>
                                        Due Date
                                    </Field.Label>

                                    <Input
                                        size="lg"
                                        type="date"
                                        value={dueDate}
                                        onChange={(e) =>
                                            setDueDate(
                                                e.target.value
                                            )
                                        }
                                    />

                                </Field.Root>

                            </Dialog.Body>


                            <Dialog.Footer>

                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsOpen(false);
                                        resetForm();
                                    }}
                                >
                                    Cancel
                                </Button>


                                <Button
                                    colorPalette="purple"
                                    onClick={
                                        editingTask
                                            ? handleUpdateTask
                                            : handleAddTask
                                    }
                                    loading={
                                        editingTask
                                            ? editSaving
                                            : saving
                                    }
                                >
                                    {editingTask
                                        ? "Update Task"
                                        : "Save Task"}
                                </Button>

                            </Dialog.Footer>

                        </Dialog.Content>

                    </Dialog.Positioner>

                </Dialog.Root>

            </Box>

        </Box>
    );
}

export default Tasks;