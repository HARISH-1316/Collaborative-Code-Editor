import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Box minH="100vh" bg="gray.900" color="white">
      {/* Navbar */}
      <Flex
        h="70px"
        px={10}
        align="center"
        justify="space-between"
        borderBottom="1px solid"
        borderColor="gray.700"
      >
        {/* Left */}
        <Button
          variant="ghost"
          colorScheme="cyan"
          fontSize="xl"
          fontWeight="bold"
          onClick={() => navigate("/")}
        >
          CCE
        </Button>

        {/* Right */}
        <HStack spacing={4}>
          <Button
            variant="ghost"
            colorScheme="whiteAlpha"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>

          <Button colorScheme="blue" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </HStack>
      </Flex>

      {/* Hero Section */}
      <Flex
        h="calc(100vh - 70px)"
        justify="center"
        align="center"
        direction="column"
        px={6}
        position="relative"
      >
        <VStack spacing={8}>
          <Heading
            size="2xl"
            bgGradient="linear(to-r, cyan.400, blue.500)"
            bgClip="text"
            textAlign="center"
          >
            Collaborative Code Editor
          </Heading>

          <Text fontSize="xl" color="gray.300" textAlign="center" maxW="700px">
            Collaborate with your teammates in real time.
            <br />
            Create rooms, write code together, and build amazing projects.
          </Text>

          <Button
            size="lg"
            colorScheme="purple"
            px={10}
            onClick={() => navigate("/lobby")}
          >
            Enter Lobby
          </Button>
        </VStack>

        {/* Footer */}
        <Text
          position="absolute"
          bottom={5}
          right={8}
          color="gray.500"
          fontSize="sm"
        >
          Made with 🔥 by{" "}
          <Text as="span" color="cyan.300" fontWeight="bold">
            Harish
          </Text>
        </Text>
      </Flex>
    </Box>
  );
};

export default Welcome;
