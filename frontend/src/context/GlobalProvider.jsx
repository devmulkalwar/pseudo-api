import { useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const GlobalProvider = ({ children }) => {
  const { isLoaded, userId, getToken } = useAuth();
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  // Add this toast utility function
  const showToast = (message, type = "default") => {
    const toastTypes = {
      success: {
        title: "Success",
        variant: "default",
        className: "bg-green-500",
      },
      error: {
        title: "Error",
        variant: "destructive",
      },
      warning: {
        title: "Warning",
        variant: "default",
        className: "bg-yellow-500",
      },
      info: {
        title: "Info",
        variant: "default",
        className: "bg-blue-500",
      },
    };

    const { title, variant, className } = toastTypes[type] || toastTypes.default;

    toast({
      title,
      description: message,
      variant,
      className,
    });
  };

  // User-related functions
  const getUser = async (id) => {
    try {
      let response;
      if (id.startsWith("user_")) {
        response = await axios.get(`${SERVER_URL}/users/clerk/${id}`);
        setUser(response.data);
      } else {
        response = await axios.get(`${SERVER_URL}/users/id/${id}`);
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      setError(error);
      throw error;
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/users`);
      setUsers(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error);
    }
  };

  // API-related functions
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
      await getApis(); // Refresh APIs list
      showToast("API created successfully", "success");
      return response.data;
    } catch (error) {
      showToast(error.response?.data?.message || "Error creating API", "error");
      throw error.response?.data || error.message;
    }
  };

  const editApi = async (apiId, updates, token) => {
    try {
      const response = await axios.put(
        `${SERVER_URL}/pseudoapi/edit/${apiId}`,
        updates,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
      await getApis(); // Refresh APIs list
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const deleteApi = async (apiId, token) => {
    try {
      if (!user?._id) {
        showToast("Please login to perform this action", "error");
        return;
      }
  
      const response = await axios.delete(
        `${SERVER_URL}/pseudoapi/delete/${apiId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      await getApis(); // Refresh APIs list
      showToast("API deleted successfully", "success");
      return response.data;
    } catch (error) {
      console.error("Delete API Error:", error);
      showToast(error.response?.data?.message || "Failed to delete API", "error");
      throw error;
    }
  };

  const defineSchema = async (apiId, schemaData, token) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/pseudoapi/schema/${apiId}`,
        schemaData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showToast("Schema defined successfully", "success");
      return response.data;
    } catch (error) {
      showToast(error.response?.data?.message || "Error defining schema", "error");
      throw error;
    }
  };

  const editSchema = async (apiId, schemaData, token) => {
    try {
      const response = await axios.put(
        `${SERVER_URL}/pseudoapi/edit-schema/${apiId}`,
        schemaData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const getApis = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/pseudoapi/get-all-Api`);
      setApis(Array.isArray(response.data) ? response.data : response.data.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching APIs:", error);
      setError(error);
    }
  };

  const getApiById = async (apiId) => {
    try {
      const response = await axios.get(`${SERVER_URL}/pseudoapi/get-api/${apiId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching API by ID:", error);
      setError(error);
    }
  };

  const getApiByUser = async (userId) => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/pseudoapi/get-api-by-user/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching APIs by user:", error);
      setError(error);
    }
  };

  // Star/Unstar API functions
  const starApi = async (apiId, token) => {
    try {
      if (!user?._id) {
        showToast("Please login to star APIs", "error");
        return;
      }

      const response = await axios.post(
        `${SERVER_URL}/pseudoapi/star-api/${apiId}`,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      await getApis(); // Refresh APIs list
      showToast("API added to favorites", "success");
      return response.data;
    } catch (error) {
      console.error("Star API Error:", error);
      showToast(error.response?.data?.message || "Failed to star API", "error");
      throw error;
    }
  };

  const unstarApi = async (apiId, token) => {
    try {
      if (!user?._id) {
        showToast("Please login to unstar APIs", "error");
        return;
      }

      const response = await axios.post(
        `${SERVER_URL}/pseudoapi/unstar-api/${apiId}`,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      await getApis(); // Refresh APIs list
      showToast("API removed from favorites", "info");
      return response.data;
    } catch (error) {
      console.error("Unstar API Error:", error);
      showToast(error.response?.data?.message || "Failed to unstar API", "error");
      throw error;
    }
  };

  // Initial data fetching
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        // User-related state and functions
        user,
        setUser,
        users,
        setUsers,
        getUser,
        getUsers,
        
        // API-related state and functions
        apis,
        setApis,
        createApi,
        editApi,
        deleteApi,
        defineSchema,
        editSchema,
        getApis,
        getApiById,
        getApiByUser,
        starApi,
        unstarApi,
        
        // Add showToast to the context
        showToast,
        
        // Utility state
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
