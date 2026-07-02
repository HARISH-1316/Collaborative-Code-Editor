import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    console.log(user);
    const url = "http://localhost:3000/login";
    try {
      const response = await axios.post(url, user, { withCredentials: true });
      if (response.data.success) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  return (
    <Flex
      minH="100vh"
      justify="center"
      align="center"
      bgGradient="linear(to-br, gray.900, blue.950, purple.900)"
      px={4}
    >
      <Box
        w="420px"
        p={10}
        rounded="2xl"
        bg="whiteAlpha.100"
        backdropFilter="blur(18px)"
        border="1px solid"
        borderColor="whiteAlpha.300"
        boxShadow="dark-lg"
      >
        <VStack spacing={6}>
          <Heading bgGradient="linear(to-r, cyan.400, blue.400)" bgClip="text">
            Welcome Back
          </Heading>

          <Text color="gray.300" textAlign="center">
            Login to continue coding with your team.
          </Text>

          <FormControl>
            <FormLabel color="gray.200">Username</FormLabel>

            <Input
              name="username"
              placeholder="Enter username or email"
              value={user.username}
              onChange={handleChange}
              bg="whiteAlpha.100"
              borderColor="gray.600"
              color="white"
              _placeholder={{ color: "gray.400" }}
              _focus={{
                borderColor: "cyan.400",
                boxShadow: "0 0 10px cyan",
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel color="gray.200">Password</FormLabel>

            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={user.password}
                onChange={handleChange}
                bg="whiteAlpha.100"
                borderColor="gray.600"
                color="white"
                _placeholder={{ color: "gray.400" }}
                _focus={{
                  borderColor: "cyan.400",
                  boxShadow: "0 0 10px cyan",
                }}
              />

              <InputRightElement>
                <Button
                  variant="ghost"
                  color="gray.300"
                  onClick={() => setShow(!show)}
                >
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button colorScheme="blue" size="lg" w="100%" onClick={handleSubmit}>
            Login
          </Button>

          <Text color="gray.300">
            Don't have an account?{" "}
            <Link color="cyan.300" onClick={() => navigate("/signup")}>
              Sign Up
            </Link>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Login;
