import {
    Box,
    Button,
    Flex,
    Heading,
    Text,
} from "@chakra-ui/react";

import {
    useLocation,
    useNavigate,
} from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <Flex
            bg="white"
            color="gray.800"
            px={{
                base: "15px",
                md: "30px",
                lg: "50px",
            }}
            py="15px"
            justify="space-between"
            align="center"
            boxShadow="sm"
            position="sticky"
            top="0"
            zIndex="20"
            gap="15px"
            flexWrap="wrap"
        >


            <Flex
                align="center"
                gap="10px"
                cursor="pointer"
                onClick={() =>
                    navigate("/dashboard")
                }
            >

                <Text fontSize="28px">
                    📚
                </Text>

                <Heading
                    size="md"
                    color="purple.700"
                >
                    Study Planner
                </Heading>

            </Flex>



            <Flex
                gap="5px"
                align="center"
                flexWrap="wrap"
            >

                <Button
                    variant={
                        isActive("/dashboard")
                            ? "solid"
                            : "ghost"
                    }
                    colorPalette="purple"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    📊 Dashboard
                </Button>


                <Button
                    variant={
                        isActive("/subjects")
                            ? "solid"
                            : "ghost"
                    }
                    colorPalette="purple"
                    onClick={() =>
                        navigate("/subjects")
                    }
                >
                    📚 Subjects
                </Button>


                <Button
                    variant={
                        isActive("/tasks")
                            ? "solid"
                            : "ghost"
                    }
                    colorPalette="purple"
                    onClick={() =>
                        navigate("/tasks")
                    }
                >
                    📝 Tasks
                </Button>

            </Flex>



            <Flex
                align="center"
                gap="12px"
            >


                <Box
                    display={{
                        base: "none",
                        md: "block",
                    }}
                >

                    <Text
                        fontSize="xs"
                        color="gray.500"
                    >
                        Welcome
                    </Text>

                    <Text
                        fontWeight="bold"
                        color="gray.700"
                    >
                        {user?.name || "Student"} 👋
                    </Text>

                </Box>



                <Button
                    variant="outline"
                    colorPalette="red"
                    onClick={handleLogout}
                >
                    Logout
                </Button>

            </Flex>

        </Flex>
    );
}

export default Navbar;