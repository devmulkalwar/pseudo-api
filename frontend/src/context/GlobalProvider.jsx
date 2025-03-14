import { useState } from "react";
import GlobalContext from "./GlobalContext";

const GlobalProvider = ({ children }) => {
  // User State (Clerk Authentication)
  const [user, setUser] = useState(null);

  const[users, setUsers] = useState([]);
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [schema, setSchema] = useState([]);

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
