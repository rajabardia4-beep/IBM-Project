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

function Subjects() {
    const [subjects, setSubjects] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("blue");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingSubject, setEditingSubject] = useState(null);




    
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

            alert(
                error.response?.data?.message ||
                "Failed to load subjects"
            );
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        fetchSubjects();
    }, []);

    const handleAddSubject = async () => {
        if (!name.trim()) {
            alert("Please enter a subject name");
            return;
        }

        try {
            setSaving(true);

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:5000/api/subjects",
                {
                    name,
                    description,
                    color,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSubjects((prev) => [
                response.data,
                ...prev,
            ]);

            setName("");
            setDescription("");
            setColor("blue");

            setIsOpen(false);

        } catch (error) {
            console.error("Add subject error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to create subject"
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteSubject = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this subject?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            console.log("Deleting subject:", id);

            await axios.delete(
                `http://localhost:5000/api/subjects/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSubjects((prev) =>
                prev.filter(
                    (subject) => subject._id !== id
                )
            );

            alert("Subject deleted successfully!");

        } catch (error) {
            console.error("Delete error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to delete subject"
            );
        }
    };

    const handleUpdateSubject = async () => {
        if (!name.trim()) {
            alert("Please enter a subject name");
            return;
        }

        try {
            setSaving(true);

            const token = localStorage.getItem("token");

            const response = await axios.put(
                `http://localhost:5000/api/subjects/${editingSubject._id}`,
                {
                    name,
                    description,
                    color,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSubjects((prev) =>
                prev.map((subject) =>
                    subject._id === editingSubject._id
                        ? response.data
                        : subject
                )
            );

            setName("");
            setDescription("");
            setColor("blue");

            setEditingSubject(null);

            setIsOpen(false);

        } catch (error) {
            console.error("Update subject error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to update subject"
            );
        } finally {
            setSaving(false);
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
                            📚 My Subjects
                        </Heading>

                        <Text
                            color="gray.500"
                            mt="5px"
                        >
                            Manage your study subjects
                        </Text>
                    </Box>

                    <Button
                        colorPalette="blue"
                        onClick={() => setIsOpen(true)}
                    >
                        + Add Subject
                    </Button>
                </Flex>


                {loading ? (
                    <Text>
                        Loading subjects...
                    </Text>
                ) : subjects.length === 0 ? (
                    <Text color="gray.500">
                        You don't have any subjects yet.
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
                        {subjects.map((subject) => (
                            <Box
                                key={subject._id}
                                bg="white"
                                p="25px"
                                borderRadius="12px"
                                shadow="sm"
                                borderTop="5px solid"
                                borderColor={`${subject.color}.500`}
                            >
                                <Heading size="md">
                                    {subject.name}
                                </Heading>

                                <Text
                                    mt="10px"
                                    color="gray.500"
                                >
                                    {subject.description ||
                                        "No description"}
                                </Text>

                                <Flex
                                    justify="space-between"
                                    align="center"
                                    mt="15px"
                                >
                                    <Text
                                        fontSize="sm"
                                        color={`${subject.color}.500`}
                                    >
                                        📖 Subject
                                    </Text>

                                    <Button
                                        size="sm"
                                        colorPalette="blue"
                                        variant="outline"
                                        onClick={() => {
                                            setEditingSubject(subject);

                                            setName(subject.name);
                                            setDescription(subject.description || "");
                                            setColor(subject.color || "blue");

                                            setIsOpen(true);
                                        }}
                                    >
                                        ✏️ Edit
                                    </Button>

                                    <Button
                                        size="sm"
                                        colorPalette="red"
                                        variant="outline"
                                        onClick={() =>
                                            handleDeleteSubject(
                                                subject._id
                                            )
                                        }
                                    >
                                        🗑️ Delete
                                    </Button>
                                </Flex>
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
                                    {editingSubject
                                        ? "Edit Subject"
                                        : "Add Subject"}
                                </Dialog.Title>
                            </Dialog.Header>

                            <Dialog.Body>

                                <Field.Root>
                                    <Field.Label>
                                        Subject Name
                                    </Field.Label>

                                    <Input
                                        placeholder="e.g. Python"
                                        value={name}
                                        onChange={(e) =>
                                            setName(
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
                                        placeholder="What are you studying?"
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
                                        Color
                                    </Field.Label>

                                    <Input
                                        placeholder="blue"
                                        value={color}
                                        onChange={(e) =>
                                            setColor(
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
                                        editingSubject
                                            ? handleUpdateSubject
                                            : handleAddSubject
                                    }
                                    loading={saving}
                                >
                                    {editingSubject
                                        ? "Update Subject"
                                        : "Save Subject"}
                                </Button>

                            </Dialog.Footer>

                        </Dialog.Content>
                    </Dialog.Positioner>
                </Dialog.Root>

            </Box>
        </Box>
    );
}

export default Subjects;