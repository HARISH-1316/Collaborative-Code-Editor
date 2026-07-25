import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  SimpleGrid,
  Text,
  HStack,
  Icon,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { FiClock, FiArrowRight, FiInbox } from "react-icons/fi";

export const RecentRooms = ({ rooms }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleRoomClick = (entry) => {
    // entry is { room: { ... }, joinedAt: Date }
    const room = entry.room || entry;
    if (room.roomId) {
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
    }
  };

  // Format the joinedAt date to a relative string
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
      <HStack justify="space-between" mb={4}>
        <Text fontSize="xl" fontWeight="semibold" color="gray.200">
          Recently Joined
        </Text>
        <Text fontSize="sm" color="gray.500">
          Showing up to 6
        </Text>
      </HStack>

      {rooms.length === 0 ? (
        <Box
          bg="gray.800"
          p={8}
          borderRadius="xl"
          borderWidth="1px"
          borderColor="gray.700"
          textAlign="center"
        >
          <Icon as={FiInbox} boxSize={8} color="gray.600" mb={3} />
          <Text color="gray.500" fontSize="sm">
            No recently joined rooms. Join a room using a Room ID to see it
            here!
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {rooms.slice(0, 6).map((entry) => {
            // Backend returns { room: { roomId, roomName, ... }, joinedAt }
            const room = entry.room || entry;
            const joinedAt = entry.joinedAt;

            return (
              <Box
                key={room._id || room.roomId || entry._id}
                bg="gray.800"
                p={5}
                borderRadius="xl"
                borderWidth="1px"
                borderColor="gray.700"
                _hover={{
                  borderColor: "purple.400",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 20px rgba(159, 122, 234, 0.15)",
                }}
                transition="all 0.2s"
                cursor="pointer"
                onClick={() => handleRoomClick(entry)}
              >
                <HStack spacing={3} mb={3}>
                  <Avatar
                    name={room.roomName || room.name || "Room"}
                    size="sm"
                    bg="purple.500"
                  />
                  <Box overflow="hidden" flex={1}>
                    <HStack justify="space-between">
                      <Text fontWeight="bold" fontSize="md" noOfLines={1}>
                        {room.roomName || room.name || "Untitled Room"}
                      </Text>
                      <Icon as={FiArrowRight} color="gray.500" flexShrink={0} />
                    </HStack>
                    <Text fontSize="xs" color="gray.400">
                      ID: {room.roomId || "N/A"}
                    </Text>
                  </Box>
                </HStack>

                <HStack color="gray.500" fontSize="xs" spacing={1} mt={2}>
                  <Icon as={FiClock} />
                  <Text>Joined {formatJoinedAt(joinedAt)}</Text>
                </HStack>
              </Box>
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
};
