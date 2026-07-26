import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  Text,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";

import {
  FiArrowRight,
  FiClock,
  FiCode,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import axios from "axios";

export const MyRooms = ({ rooms }) => {
  const navigate = useNavigate();
  const toast = useToast();

  // Delete Dialog State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const cancelRef = useRef();

  // ================= OPEN ROOM =================

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

  // ================= EDIT =================

  const handleEditRoom = (e, room) => {
    e.stopPropagation();

    navigate(`/rooms/${room.roomId}/edit`);
  };

  // ================= DELETE =================

  const handleDeleteRoom = (e, room) => {
    e.stopPropagation();

    setSelectedRoom(room);
    setIsDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
    setSelectedRoom(null);
  };

  const handleConfirmDelete = async () => {
    const url = `http://localhost:3000/editor/${selectedRoom.roomId}/delete`;

    try {
      const response = await axios.delete(url, {
        withCredentials: true,
      });

      if (response.data.success) {
        console.log("abcd");
        toast({
          title: "Room Deleted",
          description: `"${selectedRoom.roomName}" has been deleted successfully.`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        handleCloseDelete();

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
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
                  transition="0.25s"
                  onClick={() => handleRoomClick(room)}
                  _hover={{
                    borderColor: "blue.400",
                    transform: "translateY(-4px)",
                    boxShadow: "xl",
                  }}
                >
                  <VStack align="stretch" spacing={3}>
                    <HStack justify="space-between" align="start">
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

                      <HStack spacing={1}>
                        <Tooltip label="Edit Room">
                          <IconButton
                            aria-label="Edit Room"
                            icon={<FiEdit2 />}
                            size="sm"
                            variant="ghost"
                            colorScheme="blue"
                            onClick={(e) => handleEditRoom(e, room)}
                          />
                        </Tooltip>

                        <Tooltip label="Delete Room">
                          <IconButton
                            aria-label="Delete Room"
                            icon={<FiTrash2 />}
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                            onClick={(e) => handleDeleteRoom(e, room)}
                          />
                        </Tooltip>

                        <Icon as={FiArrowRight} color="blue.400" boxSize={5} />
                      </HStack>
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

      {/* Delete Confirmation Dialog */}

      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleCloseDelete}
        isCentered
      >
        <AlertDialogOverlay backdropFilter="blur(4px)">
          <AlertDialogContent bg="gray.800" color="white">
            <AlertDialogHeader>Delete Room</AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete{" "}
              <Text as="span" color="blue.300" fontWeight="bold">
                {selectedRoom?.roomName}
              </Text>
              ?
              <br />
              This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={handleCloseDelete}
                variant="ghost"
              >
                Cancel
              </Button>

              <Button colorScheme="red" ml={3} onClick={handleConfirmDelete}>
                Yes, Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default MyRooms;
