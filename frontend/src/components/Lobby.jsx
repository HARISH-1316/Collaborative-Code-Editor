import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSocket } from "../SocketContext";
import { useNavigate } from "react-router-dom";
import { FiLogIn, FiPlus } from "react-icons/fi";

const Lobby = ({ userName }) => {
  const socket = useSocket();
  const toast = useToast();

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
        roomJoinedToast();
        navigate(`/editor/${roomId}/file/${response.fileName}`);
      } else {
        console.log("error occured");
      }
    });
  };

  const roomJoinedToast = () => {
    toast({
      title: "Room Joined",
      description: "You have joined the collaboration room successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <HStack mt={8} spacing={4}>
      <Button
        colorScheme="blue"
        leftIcon={<Icon as={FiPlus} />}
        onClick={() => navigate("/editor")}
        size="lg"
        borderRadius="xl"
        px={8}
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
        }}
        transition="all 0.2s"
      >
        Create New Room
      </Button>
      <Button
        variant="outline"
        colorScheme="blue"
        leftIcon={<Icon as={FiLogIn} />}
        onClick={() => navigate("/join")}
        size="lg"
        borderRadius="xl"
        px={8}
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
          bg: "blue.500",
          color: "white",
        }}
        transition="all 0.2s"
      >
        Join Room
      </Button>
    </HStack>
  );
};

export default Lobby;
