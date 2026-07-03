import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Spacer,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { useSocket } from "../SocketContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Navbar = ({ roomName, roomId, owner, users = [] }) => {
  const socket = useSocket();
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);

  const handleLeaveRoom = () => {
    socket.emit("leaveRoom", (response) => {
      if (response.success) {
        console.log(response.message);
        navigate("/lobby");
      }
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      bg="gray.900"
      color="white"
      px={8}
      py={4}
      borderBottom="1px solid"
      borderColor="gray.700"
      shadow="md"
    >
      <Flex align="center">
        {/* Left */}
        <HStack spacing={6}>
          <Box>
            <Text
              fontSize="xs"
              color="gray.400"
              textTransform="uppercase"
              letterSpacing="1px"
            >
              Room
            </Text>

            <Text fontSize="lg" fontWeight="bold">
              {roomName}
            </Text>
          </Box>

          <Divider orientation="vertical" h="40px" borderColor="gray.700" />

          <Box>
            <Text
              fontSize="xs"
              color="gray.400"
              textTransform="uppercase"
              letterSpacing="1px"
            >
              Room ID
            </Text>

            <HStack spacing={2}>
              <Badge
                colorScheme="purple"
                px={3}
                py={1}
                rounded="full"
                fontSize="0.8rem"
                cursor="pointer"
                onClick={handleCopy}
                _hover={{ opacity: 0.8 }}
              >
                {roomId}
              </Badge>

              <Tooltip label={copied ? "Copied!" : "Copy Room ID"} hasArrow>
                <IconButton
                  size="xs"
                  icon={copied ? <CheckIcon /> : <CopyIcon />}
                  aria-label="Copy Room ID"
                  onClick={handleCopy}
                  colorScheme={copied ? "green" : "purple"}
                  variant="ghost"
                />
              </Tooltip>
            </HStack>
          </Box>

          <Divider orientation="vertical" h="40px" borderColor="gray.700" />

          <Box>
            <Text
              fontSize="xs"
              color="gray.400"
              textTransform="uppercase"
              letterSpacing="1px"
            >
              Owner
            </Text>

            <Badge colorScheme="green" px={3} py={1} rounded="full">
              👑 {owner}
            </Badge>
          </Box>
        </HStack>

        <Spacer />

        {/* Right */}
        <Spacer />

        <HStack spacing={5}>
          <Badge
            colorScheme="green"
            px={3}
            py={1}
            rounded="full"
            fontSize="0.85rem"
          >
            🟢 {users.length} Online
          </Badge>

          <AvatarGroup size="md" max={5}>
            {users.map((user) => (
              <Tooltip label={user} hasArrow>
                <Avatar name={user} border="2px solid" borderColor="gray.900" />
              </Tooltip>
            ))}
          </AvatarGroup>

          <Divider orientation="vertical" h="36px" borderColor="gray.700" />

          <Button
            colorScheme="red"
            variant="outline"
            size="sm"
            borderRadius="lg"
            _hover={{
              bg: "red.500",
              color: "white",
            }}
            onClick={handleLeaveRoom}
          >
            Leave Room
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
