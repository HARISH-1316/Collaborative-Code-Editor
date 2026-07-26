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
import { FiCode, FiArrowRight, FiClock } from "react-icons/fi";

export const MyRooms = ({ rooms }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleRoomClick = (room) => {
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

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          My Rooms
        </Text>

        <Badge colorScheme="blue" px={3} py={1} borderRadius="full">
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
          <Icon as={FiCode} boxSize={10} color="gray.500" mb={4} />

          <Text color="white" fontWeight="semibold">
            No Rooms Found
          </Text>

          <Text color="gray.500" mt={2}>
            Create your first collaborative room to get started.
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {rooms.map((item) => {
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
                onClick={() => handleRoomClick(room)}
                _hover={{
                  borderColor: "blue.400",
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
                        <Badge colorScheme="blue">
                          {room.file?.fileName || "No File"}
                        </Badge>

                        <Badge colorScheme="green">
                          {room.file?.language || "Unknown"}
                        </Badge>
                      </HStack>
                    </VStack>

                    <Icon as={FiArrowRight} color="blue.400" boxSize={5} />
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
                            Created
                          </Text>
                        </HStack>

                        <Text fontSize="xs" color="gray.500">
                          {new Date(item.createdAt).toLocaleDateString()}
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

export default MyRooms;
