import { useToast } from "@chakra-ui/react";
import api from "./api";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const checkAuth = useCallback(async () => {
    try {
      const response = await api.get("/checkAuth", {
        withCredentials: true,
      });

      if (response.data.success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      return response.data.success;
    } catch (err) {
      console.log(err);
      setIsAuthenticated(false);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const authLogin = async () => {
    await checkAuth();
  };

  const authLogout = async () => {
    try {
      await api.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );
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

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        checkAuth,
        authLogin,
        authLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
