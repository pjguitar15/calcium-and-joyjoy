import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./App.css";
import Homepage from "./Home/Homepage";
import Layout from "./Shared/UI/Layout";
import ErrorPage from "./Shared/UI/ErrorPage";
import theme from "./Shared/UI/chakraTheme";
import { Provider } from "react-redux";
import store from "./Store/cart";

// LAZY PAGES
const AuthPage = lazy(() => import("./Auth/AuthPage"));
const CartPage = lazy(() => import("./Cart/CartPage"));
const ProductPage = lazy(() => import("./Product/ProductPage"));
const CheckoutPage = lazy(() => import("./Checkout/CheckoutPage"));
const ProductList = lazy(() => import("./Product/ProductList"));
const CustomizePage = lazy(() => import("./Customize/CustomizePage"));
const AccountPage = lazy(() => import("./Account/AccountPage"));
const SearchPage = lazy(() => import("./Search/Searchpage"));
const AdminPage = lazy(() => import("./Admin/AdminPage"));
const Overview = lazy(() => import("./Admin/Overview"));
const Roles = lazy(() => import("./Admin/Users/Roles"));
const Customers = lazy(() => import("./Admin/Users/Customers"));
const UsersAuth = lazy(() => import("./Admin/Users/UsersAuth"));
const AboutPage = lazy(() => import("./AboutPage"));
const WishListPage = lazy(() => import("./WishList/WishListPage"));

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
        path: "/wishlist",
        element: (
          <Suspense fallback={<div />}>
            <WishListPage />
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
        path: "/products",
        element: (
          <Suspense fallback={<div />}>
            <ProductList />
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
      {
        path: "/me",
        element: (
          <Suspense fallback={<div />}>
            <AccountPage />
          </Suspense>
        ),
      },
      {
        path: "/search/:keyword",
        element: (
          <Suspense fallback={<div />}>
            <SearchPage />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<div />}>
            <AboutPage />
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

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </ChakraProvider>
);
