import { useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const GlobalProvider = ({ children }) => {
  // Clerk Authentication
  const { isLoaded, userId, getToken } = useAuth();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [schema, setSchema] = useState([]);
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const getUser = async (userId) => {
    try {
      const response = await axios.get(`${SERVER_URL}/users/${userId}`);
      setUser(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching user:", error);
      setError(error);
    }
  };

  const getUsers = async () => {
    try {
     
      const response = await axios.get(`${SERVER_URL}/users`);
      setUsers(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error);
    }
  };

 const createApi = async (apiData, token) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/pseudoapi/create`,
        apiData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token if Clerk auth is required
          },
        }
      );
  
      return response.data; // Returns the API URL or success message
    } catch (error) {
      console.error("Error creating API:", error);
      throw error.response?.data || error.message;
    }
  };

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, [userId]); 

  useEffect(() => {
    getUsers();
  }, []);

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
        createApi
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
