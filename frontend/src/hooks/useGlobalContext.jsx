import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
  const [apis, setApis] = useState([]);
  const [user, setUser] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const getUser = async (userId) => {
    // ...existing code...
  };

  const starApi = async (apiId, token) => {
    // ...existing code...
  };

  const unstarApi = async (apiId, token) => {
    // ...existing code...
  };

  const deleteApi = async (apiId, token) => {
    try {
      await axios.delete(`${BASE_URL}/api/delete/${apiId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Update local state to remove deleted API
      setApis(prev => prev.filter(api => api._id !== apiId));
    } catch (error) {
      console.error("Delete API Error:", error);
      throw error; // Re-throw to handle in component
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        apis,
        user,
        getUser,
        starApi,
        unstarApi,
        deleteApi,
        // ...other context values
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};