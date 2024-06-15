import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home.jsx";
import Layout from "../layout/Layout.jsx";
import Levels from "../views/Levels.jsx";
import Login from "../components/login/Login.jsx";
import Register from "../components/signin/SignIn.jsx";
import Forum from "../components/forum/forum/Forum.jsx";
import Profile from "../components/profile/Profile.jsx";
import Admin from "../views/Admin.jsx";
import Test from "../views/Test.jsx";
import LevelInfo from "../views/LevelInfo.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home />, index: true },
      { path: "/Levels", element: <Levels />, index: true },
      { path: "/Level/:levelId", element: <LevelInfo /> },
      { path: "/Level/:levelId/exam", element: <Test />, index: true},
      //{ path: "/LevelOverview/:levelId/Exam", element: <LevelOverview /> },
      { path: "/login", element: <Login />, index: true },
      { path: "/register", element: <Register />, index: true },
      { path: "/forum", element: <Forum />, index: true },
      { path: "/profile", element: <Profile />, index: true },
      { path: "/admin", element: <Admin />, index: true },

      // Add other routes here
    ],
  },
  // You can define other top-level routes that might not use the common Layout here
]);
