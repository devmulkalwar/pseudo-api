import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Error from "./pages/Error.jsx";
import Explore from "./pages/Explore.jsx";
import CreateApi from "./pages/CreateApi.jsx";
import Profile from "./pages/Profile.jsx";
import Documentation from "./pages/Documentation";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the protected route
import GlobalProvider from "./context/GlobalProvider";

// Clerk Frontend API Key (Replace with your actual key)
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "explore", element: <Explore /> },
      { path: "docs", element: <Documentation /> },
      { path: "contact", element: <Contact /> },
      { path: "about", element: <About /> },

      // Protected Routes (Require Authentication)
      {
        element: <ProtectedRoute />, // Wrapper for protected routes
        children: [
          { path: "create-api", element: <CreateApi /> },
          { path: "profile/:id", element: <Profile /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <GlobalProvider>
      <RouterProvider
        router={router}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      />
    </GlobalProvider>
  </ClerkProvider>
);
