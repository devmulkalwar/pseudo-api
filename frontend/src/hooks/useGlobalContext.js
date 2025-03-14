import { useContext } from "react";
import GlobalContext from "../context/GlobalContext.jsx";

// Custom Hook to Access Global Context
const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within GlobalProvider");
  }
  return context;
};

export default useGlobalContext;
