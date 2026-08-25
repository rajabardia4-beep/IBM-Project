import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

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
            console.error("Failed to load tasks:", error);
        } finally {
            setLoading(false);
        }
    };

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
            console.error("Failed to load subjects:", error);
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

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:5000/api/tasks",
                {
                    title,
                    description,
                    priority,
                    dueDate: dueDate || null,
                    subjectId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );



            setTasks((prev) => [
                response.data,
                ...prev,
            ]);

            setTitle("");
            setDescription("");
            setPriority("medium");
            setDueDate("");
            setSubjectId("");

            setIsOpen(false);

        } catch (error) {
            console.error("Add task error:", error);

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

            const token = localStorage.getItem("token");

            const response = await axios.put(
                `http://localhost:5000/api/tasks/${editingTask._id}`,
                {
                    title,
                    description,
                    priority,
                    dueDate: dueDate || null,
                    subjectId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTasks((prev) =>
                prev.map((task) =>
                    task._id === editingTask._id
                        ? response.data
                        : task
                )
            );

            setTitle("");
            setDescription("");
            setPriority("medium");
            setDueDate("");
            setSubjectId("");

            setEditingTask(null);
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
        setDescription(task.description || "");
        setPriority(task.priority || "medium");
        setDueDate(
            task.dueDate
                ? task.dueDate.substring(0, 10)
                : ""
        );
        setSubjectId(
            task.subjectId?._id || task.subjectId || ""
        );

        setIsOpen(true);
    };

    const handleCompleteTask = async (task) => {
        try {
            const token = localStorage.getItem("token");

            const newStatus =
                task.status === "completed"
                    ? "pending"
                    : "completed";

            const response = await axios.put(
                `http://localhost:5000/api/tasks/${task._id}`,
                {
                    status: newStatus,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/tasks/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTasks((prev) =>
                prev.filter(
                    (task) => task._id !== id
                )
            );

            alert("Task deleted successfully!");

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

    return (
        <Box
            minH="100vh"
            bg="gray.50"
        >

            <Navbar />

            <Box
                p={{
                    base: "20px",
                    md: "30px",
                    lg: "40px",
                }}
            >

                <Flex
                    justify="space-between"
                    align="center"
                    mb="30px"
                >
                    <Box>
                        <Heading size="xl">
                            📝 My Tasks
                        </Heading>

                        <Text
                            color="gray.500"
                            mt="5px"
                        >
                            Manage your study tasks
                        </Text>
                    </Box>

                    <Button
                        colorPalette="blue"
                        onClick={() => setIsOpen(true)}
                    >
                        + Add Task
                    </Button>
                </Flex>

                <Flex
                    gap="10px"
                    mb="25px"
                    flexWrap="wrap"
                >
                    <Button
                        variant={filter === "all" ? "solid" : "outline"}
                        colorPalette="blue"
                        onClick={() => setFilter("all")}
                    >
                        All
                    </Button>

                    <Button
                        variant={filter === "pending" ? "solid" : "outline"}
                        colorPalette="orange"
                        onClick={() => setFilter("pending")}
                    >
                        Pending
                    </Button>

                    <Button
                        variant={filter === "completed" ? "solid" : "outline"}
                        colorPalette="green"
                        onClick={() => setFilter("completed")}
                    >
                        Completed
                    </Button>
                </Flex>


                {loading ? (
                    <Text>Loading tasks...</Text>
                ) : filteredTasks.length === 0 ? (
                    <Text color="gray.500">
                        {filter === "pending"
                            ? "No pending tasks."
                            : filter === "completed"
                                ? "No completed tasks."
                                : "You don't have any tasks yet."}
                    </Text>
                ) : (
                    <SimpleGrid
                        columns={{
                            base: 1,
                            md: 2,
                            lg: 3,
                        }}
                        gap="20px"
                    >

                        {filteredTasks.map((task) => (

                            <Box
                                key={task._id}
                                bg="white"
                                p="25px"
                                borderRadius="12px"
                                shadow="sm"
                            >

                                <Heading size="md">
                                    {task.title}
                                </Heading>

                                <Text
                                    mt="10px"
                                    color="gray.500"
                                >
                                    {task.description ||
                                        "No description"}
                                </Text>

                                <Text
                                    mt="15px"
                                    fontSize="sm"
                                >
                                    📚{" "}
                                    {task.subjectId?.name ||
                                        "No subject"}
                                </Text>

                                <Text
                                    mt="8px"
                                    fontSize="sm"
                                >
                                    ⭐ Priority:{" "}
                                    {task.priority}
                                </Text>

                                <Text
                                    mt="8px"
                                    fontSize="sm"
                                >
                                    📌 Status:{" "}
                                    {task.status}
                                </Text>

                                <Flex
                                    gap="10px"
                                    mt="20px"
                                >
                                    <Button
                                        size="sm"
                                        colorPalette="blue"
                                        variant="outline"
                                        onClick={() =>
                                            handleEditTask(task)
                                        }
                                    >
                                        ✏️ Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        colorPalette={
                                            task.status === "completed"
                                                ? "orange"
                                                : "green"
                                        }
                                        onClick={() =>
                                            handleCompleteTask(task)
                                        }
                                    >
                                        {task.status === "completed"
                                            ? "↩️ Mark Pending"
                                            : "✅ Complete"}
                                    </Button>

                                    <Button
                                        size="sm"
                                        colorPalette="red"
                                        variant="outline"
                                        onClick={() =>
                                            handleDeleteTask(task._id)
                                        }
                                    >
                                        🗑️ Delete
                                    </Button>
                                </Flex>

                                {task.dueDate && (
                                    <Text
                                        mt="8px"
                                        fontSize="sm"
                                    >
                                        📅 Due:{" "}
                                        {new Date(
                                            task.dueDate
                                        ).toLocaleDateString()}
                                    </Text>
                                )}

                            </Box>

                        ))}

                    </SimpleGrid>
                )}


                <Dialog.Root
                    open={isOpen}
                    onOpenChange={(e) =>
                        setIsOpen(e.open)
                    }
                >

                    <Dialog.Backdrop />

                    <Dialog.Positioner>

                        <Dialog.Content>

                            <Dialog.Header>
                                <Dialog.Title>
                                    Add Task
                                </Dialog.Title>
                            </Dialog.Header>


                            <Dialog.Body>

                                <Field.Root>
                                    <Field.Label>
                                        Task Title
                                    </Field.Label>

                                    <Input
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
                                            padding: "10px",
                                            borderRadius: "6px",
                                            border: "1px solid #CBD5E0",
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
                                            padding: "10px",
                                            borderRadius: "6px",
                                            border: "1px solid #CBD5E0",
                                        }}
                                    >
                                        <option value="low">
                                            Low
                                        </option>

                                        <option value="medium">
                                            Medium
                                        </option>

                                        <option value="high">
                                            High
                                        </option>
                                    </select>
                                </Field.Root>


                                <Field.Root mt="20px">
                                    <Field.Label>
                                        Due Date
                                    </Field.Label>

                                    <Input
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
                                    onClick={() =>
                                        setIsOpen(false)
                                    }
                                >
                                    Cancel
                                </Button>

                                <Button
                                    colorPalette="blue"
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