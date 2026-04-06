import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import Home from "../screens/Home";
import Contact from "../screens/Contact";
import Cart from "../screens/Cart";
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import Login from "../components/Login";
import Register from "../components/Register";
import ProtectedDashboard from "./ProtectedDashboard";
import AuthProtected from "./AuthProtected";
import ProductDetails from "../screens/ProductDetails";

const AppRoutes = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedDashboard />,
      children: [
        {
          element: <MainLayout />,
          children: [
            { index: true, element: <Home /> },
            { path: "cart", element: <Cart /> },
            { path: "contact", element: <Contact /> },
            { path: "product/detail/:id", element: <ProductDetails /> },
          ],
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthProtected />,
      children: [
        {
          element: <AuthLayout />,
          children: [
            { index: true, element: <Login /> },
            { path: "register", element: <Register /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;