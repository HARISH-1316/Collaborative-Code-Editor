import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Link,
  Text,
  VStack,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../checkAuth";

const SignUp = () => {
  const navigate = useNavigate();
  const { authLogin } = useAuth();
  const toast = useToast();

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [show, setShow] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]:
        value.trim() === ""
          ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
          : "",
    }));
  };

  const handleSubmit = async () => {
    const newErrors = {
      username: "",
      email: "",
      phone: "",
      password: "",
    };

    if (!user.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!user.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(user.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!user.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (
      newErrors.username ||
      newErrors.email ||
      newErrors.phone ||
      newErrors.password
    ) {
      return;
    }

    const url = "http://localhost:3000/auth/signup";

    try {
      const response = await axios.post(url, user, {
        withCredentials: true,
      });

      if (response.data.success) {
        authLogin();
        signupToast();
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const signupToast = () => {
    toast({
      title: "Account Created",
      description: "Your account has been created successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
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

          <FormControl isInvalid={!!errors.username}>
            <FormLabel color="gray.200">Username</FormLabel>

            <Input
              name="username"
              placeholder="Enter username"
              value={user.username}
              onChange={handleChange}
              bg="whiteAlpha.100"
              borderColor="gray.600"
              color="white"
              errorBorderColor="red.400"
              _placeholder={{ color: "gray.400" }}
              _focus={{
                borderColor: "cyan.400",
                boxShadow: "0 0 10px cyan",
              }}
            />

            <FormErrorMessage>{errors.username}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
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
              errorBorderColor="red.400"
              _placeholder={{ color: "gray.400" }}
              _focus={{
                borderColor: "cyan.400",
                boxShadow: "0 0 10px cyan",
              }}
            />

            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.phone}>
            <FormLabel color="gray.200">Phone Number</FormLabel>

            <Input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={user.phone}
              onChange={handleChange}
              maxLength={10}
              inputMode="numeric"
              bg="whiteAlpha.100"
              borderColor="gray.600"
              color="white"
              errorBorderColor="red.400"
              _placeholder={{ color: "gray.400" }}
              _focus={{
                borderColor: "cyan.400",
                boxShadow: "0 0 10px cyan",
              }}
            />

            <FormErrorMessage>{errors.phone}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
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
                errorBorderColor="red.400"
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

            <FormErrorMessage>{errors.password}</FormErrorMessage>
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
            <Link color="cyan.300" onClick={() => navigate("/auth/login")}>
              Login
            </Link>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default SignUp;
