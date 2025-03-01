import { Navigate, Outlet } from "react-router-dom";
import { SignInButton, useAuth } from "@clerk/clerk-react";
import { Divide } from "lucide-react";

const ProtectedRoute = () => {
  const { isSignedIn } = useAuth();

  return isSignedIn ? <Outlet /> : (<div>Please sign in  / sign up to view this page </div>);
};

export default ProtectedRoute;
