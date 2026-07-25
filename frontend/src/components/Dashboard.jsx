import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Flex,
  HStack,
  Text,
  Button,
  Spinner,
  Center,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { FiPlus, FiLogIn } from "react-icons/fi";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { Rooms } from "./userRooms";
import Lobby from "./Lobby";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("Dashboard");

  const navigate = useNavigate();

  // Fetch user details from backend when Dashboard mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const url = "http://localhost:3000/auth/me";
      try {
        const response = await axios.get(url, { withCredentials: true });

        if (response.data && response.data.username) {
          console.log(response.data);
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/auth/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error("Logout error:", err);
    }
    setUser(null);
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/auth/login");
  };

  const handleSignup = () => {
    navigate("/auth/signup");
  };

  const handleSidebarChange = (section) => {
    setActiveSection(section);
  };

  if (loading) {
    return (
      <Center bg="gray.900" minH="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  // Extract rooms data from user, limit to 5 each
  const myRooms = user?.myRooms?.slice(0, 5) || [];
  const recentRooms = user?.recentRooms?.slice(0, 5) || [];

  return (
    <Box bg="gray.900" minH="100vh" color="white">
      {/* Pass user and auth handlers to Navbar */}
      <DashboardNavbar
        user={user}
        onLogout={handleLogout}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />

      <Flex h="calc(100vh - 70px)">
        <DashboardSidebar
          active={activeSection}
          onChange={handleSidebarChange}
        />

        <Box flex={1} p={8} overflowY="auto">
          {user ? (
            <>
              <Text fontSize="3xl" fontWeight="bold">
                👋 Welcome, {user.username}
              </Text>

              <HStack mt={8} spacing={4}>
                <Lobby />
              </HStack>

              {/* Render Rooms with real data from /auth/me */}
              <Rooms
                myRooms={myRooms}
                recentRooms={recentRooms}
                activeSection={activeSection}
              />
            </>
          ) : (
            <Center h="60vh">
              <Box textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" mb={4} color="gray.300">
                  Please log in to access your dashboard and rooms.
                </Text>
                <HStack justify="center" spacing={4}>
                  <Button colorScheme="blue" onClick={handleLogin}>
                    Log In
                  </Button>
                  <Button
                    variant="outline"
                    colorScheme="blue"
                    onClick={handleSignup}
                  >
                    Sign Up
                  </Button>
                </HStack>
              </Box>
            </Center>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;
