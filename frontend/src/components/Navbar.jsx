import { Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <Flex
            bg="blue.600"
            color="white"
            px={{ base: "20px", md: "40px" }}
            py={{ base: "15px", md: "20px" }}
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            direction={{ base: "column", md: "row" }}
            gap={{ base: "15px", md: "0" }}
        >

            <Heading size="lg">
                📚 Study Planner
            </Heading>


            <Flex
                gap={{ base: "5px", md: "10px" }}
                align="center"
                flexWrap="wrap"
            >

                <Button
                    colorPalette="whiteAlpha"
                    variant="ghost"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    📊 Dashboard
                </Button>


                <Button
                    colorPalette="whiteAlpha"
                    variant="ghost"
                    onClick={() =>
                        navigate("/subjects")
                    }
                >
                    📚 Subjects
                </Button>


                <Button
                    colorPalette="whiteAlpha"
                    variant="ghost"
                    onClick={() =>
                        navigate("/tasks")
                    }
                >
                    📝 Tasks
                </Button>


                <Button
                    colorPalette="whiteAlpha"
                    onClick={handleLogout}
                >
                    Logout
                </Button>

            </Flex>

        </Flex>
    );
}

export default Navbar;