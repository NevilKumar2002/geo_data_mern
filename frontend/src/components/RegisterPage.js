import React, { useState } from "react";
import { Box, FormControl, FormLabel, Input, Button, Heading, Text } from "@chakra-ui/react";
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

    if (!name || !email || !username || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post("https://geo-data-mern.vercel.app/api/users/register", {
        name,
        email,
        username,
        password,
        confirmPassword,
      });
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
        if (error.response.data.message.includes("User Already Registered")) {
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt="10">
      <Heading mb="6">Register</Heading>
      {error && <Text color="red.500" mb="4">{error}</Text>}
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel>Name</FormLabel>
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
      <p>Alreday Have an Account ?<span><Link to ="/login">Login Here</Link></span></p>
    </Box>
  );
};

export default RegisterPage;


