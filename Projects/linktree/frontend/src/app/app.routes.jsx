import { createBrowserRouter } from "react-router-dom";
import Landing from "../features/home/pages/Landing";
import Home from "../features/home/pages/Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import Analytics from "../pages/analytics/Analytics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/analytics",
    element: <Analytics />,
  },
  {
    path: "/:username",
    element: <Home />,
  },
]);

export default router;
