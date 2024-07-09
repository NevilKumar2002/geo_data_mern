import React, { useState } from "react";
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

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!name || !email || !username || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
<<<<<<< HEAD
      await axios.post("http://localhost:8007/users/register", {
=======
      // API call to register user
      const response = await axios.post("https://geo-data-mern.onrender.com/users/register", {
>>>>>>> c2d6a0ccf368996613f5e94c08cbbe0145b8fbdd
        name,
        email,
        username,
        password,
      });

      if (response.status === 200) {
        navigate("/login");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
<<<<<<< HEAD
    <Box  maxW="md"
    mx="auto"
    mt="10"
    p="6"
    borderWidth="1px"
    borderRadius="lg"
    boxShadow="lg">
      <Heading mb="6" style={{textAlign:'center'}}>Register</Heading>
=======
    <Box maxW="sm" mx="auto" mt="10" p="6">
      <Heading mb="6">Register</Heading>
>>>>>>> c2d6a0ccf368996613f5e94c08cbbe0145b8fbdd
      {error && <Text color="red.500" mb="4">{error}</Text>}
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel >Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <FormControl mb="4">
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Register
        </Button>
      </form>
<<<<<<< HEAD
      <p>Alreday Have an Account ?<span><Link to ="/login" className="login">Login Here</Link></span></p>
=======
      <Text mt="4">
        Already have an account?{" "}
        <Link to="/login" color="teal.500">
          Login Here
        </Link>
      </Text>
>>>>>>> c2d6a0ccf368996613f5e94c08cbbe0145b8fbdd
    </Box>
  );
};

<<<<<<< HEAD
export default RegisterPage;
=======
export default RegisterPage;
>>>>>>> c2d6a0ccf368996613f5e94c08cbbe0145b8fbdd
