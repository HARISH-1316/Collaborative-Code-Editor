import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  VStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
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
    const url = "http://localhost:3000/signup";
    try {
      const response = await axios.post(url, user, { withCredentials: true });
      if (response.data.success) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
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
          <Heading
            color="white"
            bgGradient="linear(to-r, cyan.400, blue.400)"
            bgClip="text"
          >
            Create Account
          </Heading>

          <Text color="gray.300" textAlign="center">
            Join the Collaborative Code Editor
          </Text>

          <FormControl>
            <FormLabel color="gray.200">Username</FormLabel>
            <Input
              name="username"
              placeholder="Enter username"
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
            <FormLabel color="gray.200">Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              value={user.email}
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
            <FormLabel color="gray.200">Phone Number</FormLabel>

            <Input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={user.phone}
              onChange={handleChange}
              maxLength={10}
              pattern="[0-9]{10}"
              inputMode="numeric"
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
                  onClick={() => setShow(!show)}
                  color="gray.300"
                >
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            colorScheme="blue"
            w="100%"
            size="lg"
            mt={2}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>

          <Text color="gray.300">
            Already have an account?{" "}
            <Link color="cyan.300" onClick={() => navigate("/login")}>
              Login
            </Link>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default SignUp;
