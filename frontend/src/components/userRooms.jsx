import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  Divider,
  Text,
  HStack,
  Badge,
  SimpleGrid,
  Button,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { FiArrowRight, FiClock } from "react-icons/fi";

export const Rooms = ({ myRooms, recentRooms, setActiveSection }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const previewMyRooms = myRooms.slice(0, 6);
  const previewRecentRooms = recentRooms.slice(0, 6);

  const handleJoinRoom = (room) => {
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
    <VStack spacing={10} align="stretch" mt={8}>
      {/* ================= MY ROOMS ================= */}
      <Box>
        <HStack justify="space-between" mb={6}>
          <VStack align="start" spacing={0}>
            <Text fontSize="2xl" fontWeight="bold">
              My Rooms
            </Text>

            <Text color="gray.500" fontSize="sm">
              Your recently created workspaces
            </Text>
          </VStack>

          <HStack>
            <Badge colorScheme="blue" px={3} py={1} borderRadius="full">
              {myRooms.length} Rooms
            </Badge>

            <Button
              size="sm"
              variant="ghost"
              colorScheme="blue"
              rightIcon={<FiArrowRight />}
              onClick={() => setActiveSection("MyRooms")}
            >
              View All
            </Button>
          </HStack>
        </HStack>

        {previewMyRooms.length === 0 ? (
          <Text color="gray.500">No rooms created yet.</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
            {previewMyRooms.map((item) => {
              const room = item.room;

              return (
                <Box
                  key={room._id}
                  bg="gray.800"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="gray.700"
                  p={5}
                  cursor="pointer"
                  transition="all .25s"
                  onClick={() => handleJoinRoom(room)}
                  _hover={{
                    transform: "translateY(-4px)",
                    borderColor: "blue.400",
                    boxShadow: "xl",
                  }}
                >
                  <HStack justify="space-between" mb={3}>
                    <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
                      {room.roomName}
                    </Text>

                    <Icon as={FiArrowRight} color="blue.400" boxSize={5} />
                  </HStack>

                  <HStack mb={4} spacing={2}>
                    <Badge colorScheme="blue">
                      {room.file?.fileName || "No File"}
                    </Badge>

                    <Badge colorScheme="green">
                      {room.file?.language || "Unknown"}
                    </Badge>
                  </HStack>

                  <Box borderTop="1px solid" borderColor="gray.700" pt={3}>
                    <HStack justify="space-between">
                      <Box>
                        <Text
                          fontSize="xs"
                          color="gray.500"
                          textTransform="uppercase"
                        >
                          Room ID
                        </Text>

                        <Text fontFamily="mono" color="gray.300" fontSize="sm">
                          {room.roomId}
                        </Text>
                      </Box>

                      <Box textAlign="right">
                        <HStack spacing={1} justify="flex-end">
                          <Icon as={FiClock} boxSize={3} color="gray.500" />

                          <Text fontSize="xs" color="gray.500">
                            Created
                          </Text>
                        </HStack>

                        <Text fontSize="xs" color="gray.400">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </Text>
                      </Box>
                    </HStack>
                  </Box>
                </Box>
              );
            })}
          </SimpleGrid>
        )}
      </Box>

      <Divider borderColor="gray.700" />

      {/* ================= RECENTLY JOINED ================= */}
      <Box>
        <HStack justify="space-between" mb={6}>
          <VStack align="start" spacing={0}>
            <Text fontSize="2xl" fontWeight="bold">
              Recently Joined
            </Text>

            <Text color="gray.500" fontSize="sm">
              Rooms you've recently collaborated in
            </Text>
          </VStack>

          <HStack>
            <Badge colorScheme="purple" px={3} py={1} borderRadius="full">
              {recentRooms.length} Rooms
            </Badge>

            <Button
              size="sm"
              variant="ghost"
              colorScheme="purple"
              rightIcon={<FiArrowRight />}
              onClick={() => setActiveSection("RecentRooms")}
            >
              View All
            </Button>
          </HStack>
        </HStack>

        {previewRecentRooms.length === 0 ? (
          <Text color="gray.500">No recently joined rooms.</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
            {previewRecentRooms.map((entry) => {
              const room = entry.room;

              return (
                <Box
                  key={room._id}
                  bg="gray.800"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="gray.700"
                  p={5}
                  cursor="pointer"
                  transition="all .25s"
                  onClick={() => handleJoinRoom(room)}
                  _hover={{
                    transform: "translateY(-4px)",
                    borderColor: "purple.400",
                    boxShadow: "xl",
                  }}
                >
                  <HStack justify="space-between" mb={3}>
                    <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
                      {room.roomName}
                    </Text>

                    <Icon as={FiArrowRight} color="purple.400" boxSize={5} />
                  </HStack>

                  <HStack mb={4} spacing={2}>
                    <Badge colorScheme="purple">
                      {room.file?.fileName || "No File"}
                    </Badge>

                    <Badge colorScheme="green">
                      {room.file?.language || "Unknown"}
                    </Badge>
                  </HStack>

                  <Box borderTop="1px solid" borderColor="gray.700" pt={3}>
                    <HStack justify="space-between">
                      <Box>
                        <Text
                          fontSize="xs"
                          color="gray.500"
                          textTransform="uppercase"
                        >
                          Room ID
                        </Text>

                        <Text fontFamily="mono" color="gray.300" fontSize="sm">
                          {room.roomId}
                        </Text>
                      </Box>

                      <Box textAlign="right">
                        <HStack spacing={1} justify="flex-end">
                          <Icon as={FiClock} boxSize={3} color="gray.500" />

                          <Text fontSize="xs" color="gray.500">
                            Joined
                          </Text>
                        </HStack>

                        <Text fontSize="xs" color="gray.400">
                          {formatJoinedAt(entry.joinedAt)}
                        </Text>
                      </Box>
                    </HStack>
                  </Box>
                </Box>
              );
            })}
          </SimpleGrid>
        )}
      </Box>
    </VStack>
  );
};
