import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import {
  Box,
  Flex,
  Text,
  Button,
  Spinner,
  Center,
  HStack,
} from "@chakra-ui/react";

import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import Lobby from "./Lobby";
import { Rooms } from "./userRooms";
import { MyRooms } from "./MyRooms";
import { RecentRooms } from "./RecentRooms";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("Dashboard");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await api.get("/auth/me", {
          withCredentials: true,
        });

        if (data?.username) {
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        if (err.response?.status !== 401) {
          toast({
            title: "Unable to Load User",
            description:
              err.response?.data?.message ||
              "An error occurred while fetching your account information.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout", {
        withCredentials: true,
      });
    } catch (err) {
      toast({
        title: "Logout Failed",
        description: "An error occurred during logout. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }

    setUser(null);
    navigate("/");
  };

  const handleLogin = () => navigate("/auth/login");
  const handleSignup = () => navigate("/auth/signup");

  if (loading) {
    return (
      <Center minH="100vh" bg="gray.900">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  const myRooms = user?.myRooms || [];
  const recentRooms = user?.recentRooms || [];

  return (
    <Box bg="gray.900" minH="100vh" color="white">
      <DashboardNavbar
        user={user}
        onLogout={handleLogout}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />

      <Flex h="calc(100vh - 70px)">
        <DashboardSidebar
          active={activeSection}
          setActiveSection={setActiveSection}
        />

        <Box flex={1} p={8} overflowY="auto">
          {user ? (
            <>
              <Text fontSize="3xl" fontWeight="bold" mb={8}>
                👋 Welcome, {user.username}
              </Text>

              {activeSection === "Dashboard" && (
                <>
                  <Lobby />

                  <Rooms
                    myRooms={myRooms}
                    recentRooms={recentRooms}
                    setActiveSection={setActiveSection}
                  />
                </>
              )}

              {activeSection === "MyRooms" && <MyRooms rooms={myRooms} />}

              {activeSection === "RecentRooms" && (
                <RecentRooms rooms={recentRooms} />
              )}
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
