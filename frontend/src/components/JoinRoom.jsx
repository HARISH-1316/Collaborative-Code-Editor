import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import CodeEditor from "./CodeEditor";
import { useSocket } from "../SocketContext";
import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

const JoinRoom = () => {
  const toast = useToast();
  const socket = useSocket();
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [showLobby, setShowLobby] = useState(true);

  const handleJoin = () => {
    if (!roomId.trim()) {
      toast({
        title: "Room ID Required",
        description: "Please enter a valid Room ID to join.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    setIsJoining(true);

    socket.emit("joinRoom", { roomId: roomId.trim() }, (response) => {
      setIsJoining(false);

      if (response.success) {
        toast({
          title: "Room Joined",
          description: "You have joined the collaboration room successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        setShowLobby(false);
        navigate(`/editor/${roomId.trim()}/file/${response.fileName}`);
      } else {
        toast({
          title: "Failed to Join",
          description:
            response.message ||
            "Could not join the room. Please check the Room ID.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      }
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleJoin();
    }
  };

  return (
    <Box position="relative" w="100vw" h="100vh" overflow="hidden">
      {/* Background: Code Editor (blurred feel) */}
      <CodeEditor />

      {/* Overlay: Joining Lobby */}
      {showLobby && (
        <Box
          position="absolute"
          inset="0"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="blackAlpha.700"
          backdropFilter="blur(8px)"
          zIndex={100}
        >
          <Box
            bg="rgba(26, 32, 44, 0.92)"
            backdropFilter="blur(20px)"
            color="white"
            p={8}
            rounded="2xl"
            w="420px"
            shadow="0 8px 32px rgba(0, 0, 0, 0.4)"
            border="1px solid"
            borderColor="gray.600"
          >
            <VStack spacing={6}>
              {/* Header */}
              <VStack spacing={1}>
                <Heading
                  size="lg"
                  bgGradient="linear(to-r, blue.400, purple.400)"
                  bgClip="text"
                >
                  Join Room
                </Heading>
                <Text color="gray.400" fontSize="sm" textAlign="center">
                  Enter the Room ID shared by the host to start collaborating.
                </Text>
              </VStack>

              {/* Room ID Input */}
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">
                  Room ID
                </FormLabel>
                <Input
                  placeholder="e.g. aB3kX9mZ"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  onKeyDown={handleKeyDown}
                  bg="gray.700"
                  border="1px solid"
                  borderColor="gray.600"
                  color="white"
                  size="lg"
                  borderRadius="xl"
                  _hover={{ borderColor: "blue.400" }}
                  _focus={{
                    borderColor: "blue.400",
                    boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)",
                  }}
                  _placeholder={{ color: "gray.500" }}
                />
              </FormControl>

              {/* Join Button */}
              <Button
                colorScheme="green"
                w="100%"
                size="lg"
                borderRadius="xl"
                leftIcon={<Icon as={FiLogIn} />}
                onClick={handleJoin}
                isLoading={isJoining}
                loadingText="Joining..."
                _hover={{
                  transform: "translateY(-1px)",
                  boxShadow: "lg",
                }}
                transition="all 0.2s"
              >
                Join Room
              </Button>

              {/* Back link */}
              <Button
                variant="ghost"
                color="gray.400"
                size="sm"
                onClick={() => navigate("/")}
                _hover={{ color: "white" }}
              >
                ← Back to Dashboard
              </Button>
            </VStack>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default JoinRoom;
