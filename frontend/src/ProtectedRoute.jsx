import { Navigate } from "react-router-dom";
import { useAuth } from "./checkAuth";
import { useToast } from "@chakra-ui/react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const toast = useToast();

  const notAuthenticatedToast = () => {
    toast({
      title: "Authentication Required",
      description: "Please log in to continue.",
      status: "warning",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    notAuthenticatedToast();
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
