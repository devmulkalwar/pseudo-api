import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Error from "./pages/Error.jsx";
import Explore from "./pages/Explore.jsx";
import CreateApi from "./pages/CreateApi.jsx";
import Profile from "./pages/Profile.jsx";
import Documentation from "./pages/Documentation";
import About from "./pages/About";
import Contact from "./pages/Contact";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "explore",
        element: <Explore />,
      },
      {
        path: "create-api",
        element: <CreateApi />,
      },
      {
        path: "docs",
        element: <Documentation />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
    

      {
        path: "profile/:id",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider
    router={router}
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  />
);
