import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./Home/Homepage";
import Layout from "./Shared/Layout";
import AuthPage from "./Auth/AuthPage";
import CartPage from "./Cart/CartPage";
import ProductPage from "./Product/ProductPage";
import CheckoutPage from "./Checkout/CheckoutPage";
import ProductList from "./Product/ProductList";
import AdminPage from "./Admin/AdminPage";
import Overview from "./Admin/Overview";
import Roles from "./Admin/Users/Roles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Homepage /> },
      {
        path: "/auth/:action",
        element: <AuthPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/browse/:brand/:category?",
        element: <ProductList />,
      },
      {
        path: "/shoe/:productID",
        element: <ProductPage />,
      },
      {
        path: "/shoe/:productID/customize",
        element: <h1>customize</h1>,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        index: "/user-management/roles-and-permissions",
        element: <Roles />,
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
