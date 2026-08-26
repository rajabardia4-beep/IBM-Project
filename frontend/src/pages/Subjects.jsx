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

    const [editingSubject, setEditingSubject] =
        useState(null);



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
                "Failed to load subjects:",
                error
            );

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

            const token =
                localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:5000/api/subjects",
                {
                    name,
                    description,
                    color,
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            setSubjects((prev) => [
                response.data,
                ...prev,
            ]);

            resetForm();

            setIsOpen(false);

        } catch (error) {
            console.error(
                "Add subject error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to create subject"
            );

        } finally {
            setSaving(false);
        }
    };



    const handleDeleteSubject = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this subject?"
            );

        if (!confirmDelete) {
            return;
        }

        try {
            const token =
                localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/subjects/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            setSubjects((prev) =>
                prev.filter(
                    (subject) =>
                        subject._id !== id
                )
            );

            alert(
                "Subject deleted successfully!"
            );

        } catch (error) {
            console.error(
                "Delete error:",
                error
            );

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

            const token =
                localStorage.getItem("token");

            const response = await axios.put(
                `http://localhost:5000/api/subjects/${editingSubject._id}`,
                {
                    name,
                    description,
                    color,
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            setSubjects((prev) =>
                prev.map((subject) =>
                    subject._id ===
                    editingSubject._id
                        ? response.data
                        : subject
                )
            );

            resetForm();

            setIsOpen(false);

        } catch (error) {
            console.error(
                "Update subject error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to update subject"
            );

        } finally {
            setSaving(false);
        }
    };



    const resetForm = () => {
        setName("");
        setDescription("");
        setColor("blue");
        setEditingSubject(null);
    };



    const openAddDialog = () => {
        resetForm();
        setIsOpen(true);
    };



    const openEditDialog = (subject) => {

        setEditingSubject(subject);

        setName(subject.name);

        setDescription(
            subject.description || ""
        );

        setColor(
            subject.color || "blue"
        );

        setIsOpen(true);
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
                    mb="35px"
                >

                    <Box>

                        <Text
                            color="purple.600"
                            fontWeight="bold"
                            mb="5px"
                        >
                            📚 YOUR STUDY SPACE
                        </Text>

                        <Heading
                            fontSize={{
                                base: "30px",
                                md: "40px",
                            }}
                        >
                            My Subjects
                        </Heading>

                        <Text
                            color="gray.600"
                            mt="8px"
                        >
                            Organize everything you're
                            learning in one place.
                        </Text>

                    </Box>


                    <Button
                        size="lg"
                        colorPalette="purple"
                        onClick={openAddDialog}
                    >
                        + Add Subject
                    </Button>

                </Flex>



                {!loading &&
                    subjects.length > 0 && (

                        <Box
                            bg="white"
                            p="18px 22px"
                            mb="25px"
                            borderRadius="15px"
                            boxShadow="sm"
                        >

                            <Flex
                                justify="space-between"
                                align="center"
                            >

                                <Text color="gray.500">
                                    You are currently
                                    studying
                                </Text>

                                <Text
                                    fontWeight="bold"
                                    color="purple.600"
                                    fontSize="lg"
                                >
                                    {subjects.length}{" "}
                                    {subjects.length === 1
                                        ? "Subject"
                                        : "Subjects"}
                                </Text>

                            </Flex>

                        </Box>

                    )}



                {loading ? (

                    <Box
                        bg="white"
                        p="50px"
                        borderRadius="20px"
                        textAlign="center"
                        boxShadow="sm"
                    >

                        <Text fontSize="40px">
                            📚
                        </Text>

                        <Text
                            mt="10px"
                            color="gray.500"
                        >
                            Loading your subjects...
                        </Text>

                    </Box>

                ) : subjects.length === 0 ? (


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
                            📚
                        </Text>

                        <Heading
                            size="md"
                            mt="15px"
                        >
                            No subjects yet
                        </Heading>

                        <Text
                            color="gray.500"
                            mt="8px"
                            maxW="450px"
                            mx="auto"
                        >
                            Add your first subject and
                            start organizing your study
                            journey.
                        </Text>

                        <Button
                            mt="25px"
                            colorPalette="purple"
                            onClick={openAddDialog}
                        >
                            + Add Your First Subject
                        </Button>

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

                        {subjects.map((subject) => (

                            <Box
                                key={subject._id}
                                bg="white"
                                borderRadius="20px"
                                overflow="hidden"
                                boxShadow="md"
                                transition="0.2s"
                                _hover={{
                                    transform:
                                        "translateY(-5px)",
                                    boxShadow: "xl",
                                }}
                            >


                                <Box
                                    h="8px"
                                    bg={`${subject.color}.500`}
                                />


                                <Box p="25px">


                                    <Flex
                                        justify="space-between"
                                        align="start"
                                    >

                                        <Box
                                            w="52px"
                                            h="52px"
                                            borderRadius="15px"
                                            bg={`${subject.color}.50`}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >

                                            <Text fontSize="25px">
                                                📖
                                            </Text>

                                        </Box>


                                        <Text
                                            fontSize="sm"
                                            fontWeight="bold"
                                            color={`${subject.color}.500`}
                                        >
                                            {subject.color}
                                        </Text>

                                    </Flex>



                                    <Heading
                                        size="md"
                                        mt="20px"
                                    >
                                        {subject.name}
                                    </Heading>



                                    <Text
                                        mt="10px"
                                        color="gray.500"
                                        minH="45px"
                                        lineHeight="1.6"
                                    >
                                        {subject.description ||
                                            "No description added yet."}
                                    </Text>



                                    <Flex
                                        justify="space-between"
                                        align="center"
                                        mt="25px"
                                        pt="18px"
                                        borderTop="1px solid"
                                        borderColor="gray.100"
                                        gap="10px"
                                    >

                                        <Text
                                            fontSize="sm"
                                            color="gray.500"
                                        >
                                            📚 Subject
                                        </Text>


                                        <Flex gap="8px">

                                            <Button
                                                size="sm"
                                                colorPalette="purple"
                                                variant="outline"
                                                onClick={() =>
                                                    openEditDialog(
                                                        subject
                                                    )
                                                }
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
                                                🗑️
                                            </Button>

                                        </Flex>

                                    </Flex>

                                </Box>

                            </Box>

                        ))}

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
                                    {editingSubject
                                        ? "✏️ Edit Subject"
                                        : "📚 Add Subject"}
                                </Dialog.Title>

                            </Dialog.Header>


                            <Dialog.Body>


                                <Field.Root>

                                    <Field.Label>
                                        Subject Name
                                    </Field.Label>

                                    <Input
                                        size="lg"
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
                                        size="lg"
                                        placeholder="blue"
                                        value={color}
                                        onChange={(e) =>
                                            setColor(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <Text
                                        fontSize="sm"
                                        color="gray.500"
                                        mt="5px"
                                    >
                                        Example: blue,
                                        purple, green,
                                        orange
                                    </Text>

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