import React, { useEffect } from "react";
import { Box, Heading, Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MapComponent from "./MapComponent";

const DashboardPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      // Redirect to login page if token does not exist
      navigate("/login");
    }
  }, [token, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8005/logout"); // Update the endpoint if needed
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" mt="10">
      {/* Section 1: Heading and Logout Button */}
      <Box
        bg="#acdcee"
        p="4"
        borderRadius="10px"
        boxShadow="1px 7px 9px 1px"
        mb="4"
        w={{ base: "90%", md: "70%", lg: "50%" }} // Adjust width for different screen sizes
      >
        <Heading mb="4" textAlign="center">
          Dashboard Page
        </Heading>
        <Flex justify="center">
          <Button onClick={handleLogout} colorScheme="teal">
            Logout
          </Button>
        </Flex>
      </Box>

      {/* Section 2: Map Component */}
      <Box
        bg="white"
        p="4"
        borderRadius="10px"
        boxShadow="1px 7px 9px 1px"
        w={{ base: "90%", md: "70%", lg: "80%" }} // Adjust width for different screen sizes
      >
        <MapComponent />
      </Box>
    </Flex>
  );
};

export default DashboardPage;
