import { Box, Flex, Icon, Text, VStack } from "@chakra-ui/react";

import { FiHome, FiFolder, FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: FiHome,
    path: "Dashboard",
  },
  {
    title: "My Rooms",
    icon: FiFolder,
    path: "MyRooms",
  },
  {
    title: "Recent Rooms",
    icon: FiClock,
    path: "RecentRooms",
  },
];

const DashboardSidebar = ({ active = "Dashboard", setActiveSection }) => {
  const navigate = useNavigate();

  return (
    <Box
      w="260px"
      h="calc(100vh - 80px)"
      bg="gray.900"
      borderRight="1px solid"
      borderColor="gray.700"
      py={8}
    >
      <VStack spacing={2} align="stretch">
        {menuItems.map((item) => {
          const isActive = active === item.path;

          return (
            <Flex
              key={item.title}
              align="center"
              gap={4}
              mx={3}
              px={5}
              py={4}
              cursor="pointer"
              borderRadius="xl"
              transition="0.2s"
              bg={isActive ? "blue.500" : "transparent"}
              color={isActive ? "white" : "gray.300"}
              _hover={{
                bg: isActive ? "blue.500" : "gray.800",
              }}
              onClick={() => {
                setActiveSection(item.path);
              }}
            >
              <Icon as={item.icon} boxSize={5} />

              <Text fontWeight={isActive ? "bold" : "medium"}>
                {item.title}
              </Text>
            </Flex>
          );
        })}
      </VStack>
    </Box>
  );
};

export default DashboardSidebar;
