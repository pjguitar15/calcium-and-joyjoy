import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./Home/Homepage";
import Layout from "./Shared/Layout";
import AuthPage from "./Auth/AuthPage";
import CartPage from "./Cart/CartPage";
import CategoryPage from "./Category/CategoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Homepage /> },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/:brand/:category?",
        element: <CategoryPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
);
