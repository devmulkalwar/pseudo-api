import { useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const GlobalProvider = ({ children }) => {
  // Clerk Authentication
  const { isLoaded, userId, getToken } = useAuth();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [apis, setApis] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);
  const [schema, setSchema] = useState([]);
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const getUser = async (userId) => {
    try {
      const response = await axios.get(`${SERVER_URL}/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      setError(error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error);
    }
  };

  const createApi = async (apiData, token) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/pseudoapi/create`,
        apiData,
        {
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating API:", error);
      throw error.response?.data || error.message;
    }
  };

  const getApis = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/pseudoapi/get-all-Api`);
      // Assuming response.data is the array; if your backend wraps it, adjust accordingly
      setApis(Array.isArray(response.data) ? response.data : response.data.data);
    } catch (error) {
      console.error("Error fetching APIs:", error);
      setError(error);
    }
  };

  // Fetch all initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          await getUser(userId);
        }
        await getUsers();
        await getApis();
      } catch (err) {
        console.error("Error in fetchData:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    getToken().then((token) => {
      console.log("JWT token:", token);
    });
  }, []);

  // Until loading is false, don't render children
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or skeleton component
  }

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        users,
        setUsers,
        apis,
        setApis,
        loading,
        setLoading,
        error,
        setError,
        schema,
        setSchema,
        createApi,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
