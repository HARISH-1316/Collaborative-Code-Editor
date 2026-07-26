import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  SimpleGrid,
  Text,
  HStack,
  Badge,
  Icon,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FiClock, FiArrowRight, FiInbox } from "react-icons/fi";

export const RecentRooms = ({ rooms }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleJoinRoom = (entry) => {
    const room = entry.room || entry;

    if (!room) return;

    toast({
      title: "Room Joined",
      description: "You have joined the collaboration room successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });

    navigate(
      `/editor/${room.roomId}/file/${room.file?.fileName || "index.js"}`,
    );
  };

  const formatJoinedAt = (dateStr) => {
    if (!dateStr) return "Unknown";

    const date = new Date(dateStr);
    const now = new Date();

    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

    return date.toLocaleDateString();
  };

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          Recently Joined
        </Text>

        <Badge colorScheme="purple" px={3} py={1} borderRadius="full">
          {rooms.length} Room{rooms.length !== 1 ? "s" : ""}
        </Badge>
      </HStack>

      {rooms.length === 0 ? (
        <Box
          bg="gray.800"
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.700"
          py={14}
          textAlign="center"
        >
          <Icon as={FiInbox} boxSize={10} color="gray.500" mb={4} />

          <Text color="white" fontWeight="semibold">
            No Recently Joined Rooms
          </Text>

          <Text color="gray.500" mt={2}>
            Join a room using a Room ID to see it here.
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {rooms.map((entry) => {
            const room = entry.room || entry;

            return (
              <Box
                key={room._id || room.roomId}
                bg="gray.800"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.700"
                p={5}
                cursor="pointer"
                transition="all .25s"
                onClick={() => handleJoinRoom(entry)}
                _hover={{
                  borderColor: "purple.400",
                  transform: "translateY(-4px)",
                  boxShadow: "xl",
                }}
              >
                <VStack align="stretch" spacing={3}>
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                      <Text
                        fontSize="md"
                        fontWeight="bold"
                        color="white"
                        noOfLines={1}
                      >
                        {room.roomName}
                      </Text>

                      <HStack>
                        <Badge colorScheme="purple">
                          {room.file?.fileName || "No File"}
                        </Badge>

                        <Badge colorScheme="green">
                          {room.file?.language || "Unknown"}
                        </Badge>
                      </HStack>
                    </VStack>

                    <Icon as={FiArrowRight} color="purple.400" boxSize={5} />
                  </HStack>

                  <Box borderTop="1px solid" borderColor="gray.700" pt={3}>
                    <HStack justify="space-between">
                      <VStack align="start" spacing={0}>
                        <Text
                          fontSize="0.7rem"
                          color="gray.500"
                          textTransform="uppercase"
                        >
                          Room ID
                        </Text>

                        <Text
                          color="gray.200"
                          fontWeight="medium"
                          fontFamily="mono"
                        >
                          {room.roomId}
                        </Text>
                      </VStack>

                      <VStack align="end" spacing={0}>
                        <HStack spacing={1}>
                          <Icon as={FiClock} color="gray.400" boxSize={3} />

                          <Text color="gray.400" fontSize="xs">
                            Joined
                          </Text>
                        </HStack>

                        <Text fontSize="xs" color="gray.500">
                          {formatJoinedAt(entry.joinedAt)}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </VStack>
              </Box>
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default RecentRooms;
