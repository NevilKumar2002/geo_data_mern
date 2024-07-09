import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("https://geo-data-mern.onrender.com/users/verifyToken", { token })
        .then((response) => {
          if (response.data.userId) {
            navigate("/dashboard");
          }
        })
        .catch((err) => console.error(err));
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginId || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "https://geo-data-mern.onrender.com/users/login",
        {
          loginId,
          password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        toast.success("Login successful");
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
        if (error.response.data.message.includes("Login id not found")) {
          setTimeout(() => {
            navigate("/register");
          }, 3000);
        }
      } else {
        toast.error("Login failed");
      }
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt="10" p="4">
      <Heading mb="6" textAlign="center">
        Login
      </Heading>
      {error && <Text color="red.500" mb="4" textAlign="center">{error}</Text>}
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel>Login ID</FormLabel>
          <Input
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" w="100%">
          Login
        </Button>
      </form>
      <Text mt="4" textAlign="center">
        Don't have an account?{" "}
        <Link to="/register" color="teal.500">
          Register here
        </Link>
      </Text>
      <ToastContainer position="bottom-right" />
    </Box>
  );
};

export default LoginPage;
