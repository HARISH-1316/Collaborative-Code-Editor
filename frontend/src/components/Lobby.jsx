import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSocket } from "../SocketContext";
import { useNavigate } from "react-router-dom";

const Lobby = ({ userName }) => {
  const socket = useSocket();

  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");

  const navigate = useNavigate();

  const handleCreateRoom = () => {
    navigate("/editor");
  };

  const handleJoinRoom = () => {
    console.log("handleJoinRoom");
    socket.emit("joinRoom", { roomId }, (response) => {
      console.log(response);
      if (response.success) {
        navigate(`/editor/${roomId}/file/${response.fileName}`);
      } else {
        console.log("error occured");
      }
    });
  };

  return (
    <Box
      minH="100vh"
      bg="gray.900"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Container maxW="4xl">
        <VStack spacing={3} mb={10}>
          <Heading color="white" size="2xl">
            Collaborative IDE
          </Heading>

          <Text color="gray.400">
            Create a new room or join an existing one.
          </Text>
        </VStack>

        <Flex gap={8} direction={{ base: "column", md: "row" }}>
          {/* Create Room */}
          <Box
            flex={1}
            bg="gray.800"
            p={8}
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.700"
            boxShadow="2xl"
          >
            <Heading size="lg" color="white" mb={2}>
              Create Room
            </Heading>

            <Text color="gray.400" mb={6}>
              Start a new collaborative coding session.
            </Text>

            <br />

            <Button
              colorScheme="blue"
              w="100%"
              size="lg"
              onClick={handleCreateRoom}
            >
              Create Room
            </Button>
          </Box>

          <Divider
            orientation="vertical"
            display={{ base: "none", md: "block" }}
            h="220px"
            borderColor="gray.700"
          />

          {/* Join Room */}
          <Box
            flex={1}
            bg="gray.800"
            p={8}
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.700"
            boxShadow="2xl"
          >
            <Heading size="lg" color="white" mb={2}>
              Join Room
            </Heading>

            <Text color="gray.400" mb={6}>
              Enter the Room ID to join.
            </Text>

            <VStack spacing={4}>
              <Input
                placeholder="Room ID"
                bg="gray.700"
                color="white"
                border="none"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />

              <Button
                colorScheme="green"
                w="100%"
                size="lg"
                onClick={handleJoinRoom}
              >
                Join Room
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Lobby;
