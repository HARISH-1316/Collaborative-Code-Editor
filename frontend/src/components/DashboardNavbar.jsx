import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, SettingsIcon } from "@chakra-ui/icons";
import { FiLogOut, FiUser } from "react-icons/fi";

const DashboardNavbar = ({ user = null, onLogout, onLogin, onSignup }) => {
  return (
    <Box
      bg="gray.900"
      borderBottom="1px solid"
      borderColor="gray.700"
      px={8}
      py={4}
      boxShadow="md"
    >
      <Flex justify="space-between" align="center">
        {/* Left Section */}
        <HStack spacing={3}>
          <Text fontSize="2xl">⚡</Text>
          <Box>
            <Text color="white" fontWeight="bold" fontSize="xl">
              Collaborative Cloud IDE
            </Text>
            <Text color="gray.400" fontSize="sm">
              Real-time Coding Platform
            </Text>
          </Box>
        </HStack>

        {/* Right Section */}
        <HStack spacing={4}>
          {user ? (
            <>
              {/* Notifications */}
              <Tooltip label="Notifications">
                <IconButton
                  aria-label="Notifications"
                  icon={<BellIcon />}
                  variant="ghost"
                  color="white"
                  fontSize="22px"
                  _hover={{ bg: "gray.700" }}
                />
              </Tooltip>

              {/* Profile Menu */}
              <Menu>
                <MenuButton>
                  <HStack
                    spacing={3}
                    cursor="pointer"
                    px={2}
                    py={1}
                    borderRadius="lg"
                    _hover={{ bg: "gray.700" }}
                  >
                    <Avatar
                      size="sm"
                      name={user.username}
                      src={user.avatarUrl || ""}
                    />

                    <Box textAlign="left">
                      <Text color="white" fontWeight="semibold">
                        {user.username}
                      </Text>
                      <Text color="gray.400" fontSize="xs">
                        {user.role || "Developer"}
                      </Text>
                    </Box>

                    <ChevronDownIcon color="gray.300" />
                  </HStack>
                </MenuButton>

                <MenuList bg="gray.800" borderColor="gray.700" color="white">
                  <MenuItem
                    bg="gray.800"
                    _hover={{ bg: "gray.700" }}
                    icon={<FiUser />}
                  >
                    Profile
                  </MenuItem>

                  <MenuItem
                    bg="gray.800"
                    _hover={{ bg: "gray.700" }}
                    icon={<SettingsIcon />}
                  >
                    Settings
                  </MenuItem>

                  <MenuDivider borderColor="gray.700" />

                  <MenuItem
                    bg="gray.800"
                    _hover={{ bg: "red.500" }}
                    icon={<FiLogOut />}
                    onClick={onLogout}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            /* Log In and Sign Up Buttons when user is null */
            <HStack spacing={3}>
              <Button
                variant="ghost"
                color="white"
                _hover={{ bg: "gray.800" }}
                size="sm"
                onClick={onLogin}
              >
                Log In
              </Button>

              <Button colorScheme="blue" size="sm" onClick={onSignup}>
                Sign Up
              </Button>
            </HStack>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default DashboardNavbar;
