import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { ChakraProvider } from "@chakra-ui/react";
import { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Homepage from "./Home/Homepage";
import Layout from "./Shared/UI/Layout";

// import Overview from "./Admin/Overview";
// import Roles from "./Admin/Users/Roles";
// import Customers from "./Admin/Users/Customers";
// import UsersAuth from "./Admin/Users/UsersAuth";
import { Suspense } from "react";
import ErrorPage from "./Shared/UI/ErrorPage";

const AuthPage = lazy(() => import("./Auth/AuthPage"));
const CartPage = lazy(() => import("./Cart/CartPage"));
const ProductPage = lazy(() => import("./Product/ProductPage"));
const CheckoutPage = lazy(() => import("./Checkout/CheckoutPage"));
const ProductList = lazy(() => import("./Product/ProductList"));
const CustomizePage = lazy(() => import("./Customize/CustomizePage"));

const AdminPage = lazy(() => import("./Admin/AdminPage"));
const Overview = lazy(() => import("./Admin/Overview"));
const Roles = lazy(() => import("./Admin/Users/Roles"));
const Customers = lazy(() => import("./Admin/Users/Customers"));
const UsersAuth = lazy(() => import("./Admin/Users/UsersAuth"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      {
        path: "/auth/:action",
        element: (
          <Suspense fallback={<div />}>
            <AuthPage />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<div />}>
            <CartPage />,
          </Suspense>
        ),
      },
      {
        path: "/browse/:brand/:category?",
        element: (
          <Suspense fallback={<div />}>
            <ProductList />,
          </Suspense>
        ),
      },
      {
        path: "/shoe/:productID",
        element: (
          <Suspense fallback={<div />}>
            <ProductPage />
          </Suspense>
        ),
      },
      {
        path: "/shoe/:productID/customize",
        element: (
          <Suspense fallback={<div />}>
            <CustomizePage />
          </Suspense>
        ),
      },
      {
        path: "/checkout",
        element: (
          <Suspense fallback={<div />}>
            <CheckoutPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<div />}>
        <AdminPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div />}>
            <Overview />
          </Suspense>
        ),
      },
      {
        path: "roles",
        element: (
          <Suspense fallback={<div />}>
            <Roles />
          </Suspense>
        ),
      },
      {
        path: "customers",
        element: (
          <Suspense fallback={<div />}>
            <Customers />
          </Suspense>
        ),
      },
      {
        path: "auth",
        element: (
          <Suspense fallback={<div />}>
            <UsersAuth />
          </Suspense>
        ),
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
