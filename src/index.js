import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import "./App.css";
import Homepage from "./Home/Homepage";
import Layout from "./Shared/UI/Layout";
import ErrorPage from "./Shared/UI/ErrorPage";
import theme from "./Shared/UI/chakraTheme";
import { Provider } from "react-redux";
import store from "./Store/cart";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import Login from './Auth/Login';
import AdminLogin from './Admin/AdminLogin';
import ProductsPage from './Product/ProductsPage'
import AdminProductsPage from './Admin/Products/AdminProductsPage';
import OrdersPage from './Admin/Orders/OrdersPage';
import AdminCategories from './Admin/Products/AdminCategories';
import AdminBrands from './Admin/Products/AdminBrands';
import AdminSizes from './Admin/Products/AdminSizes';
import AdminColors from './Admin/Products/AdminColors';
import AdminTypes from './Admin/Products/AdminTypes';


// LAZY PAGES
const AuthPage = lazy(() => import("./Auth/AuthPage"));
const CartPage = lazy(() => import("./Cart/CartPage"));
const ItemPage = lazy(() => import("./Product/ItemPage"));
const CheckoutPage = lazy(() => import("./Checkout/CheckoutPage"));
const ProductList = lazy(() => import("./Product/ProductList"));
const CustomizePage = lazy(() => import("./Customize/CustomizePage"));
const AccountPage = lazy(() => import("./Account/AccountPage"));
const SearchPage = lazy(() => import("./Search/Searchpage"));
const AdminPage = lazy(() => import("./Admin/AdminPage"));
const Overview = lazy(() => import("./Admin/Overview/Overview"));
const Roles = lazy(() => import("./Admin/Users/Roles/Roles"));
const Customers = lazy(() => import("./Admin/Users/Customers"));
const UsersAuth = lazy(() => import("./Admin/Users/UsersAuth"));
const AboutPage = lazy(() => import("./AboutPage"));
const WishListPage = lazy(() => import("./WishList/WishListPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <TawkMessengerReact
        propertyId='656e7c74ff45ca7d4786dfc0'
        widgetId='1hgrpca5t'
      />
      <Layout />
    </>,
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
            <ProductsPage />
          </Suspense>
        ),
      },
      {
        path: "/shoe/:productID",
        element: (
          <Suspense fallback={<div />}>
            <ItemPage />
          </Suspense>
        ),
      },
      {
        path: "/customize",
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
    path: "/admin/login",
    element: (
      <Suspense fallback={<div />}>
        <AdminLogin />
      </Suspense>
    ),
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
        path: "login",
        element: (
          <Suspense fallback={<div />}>
            <AdminLogin />
          </Suspense>
        ),
      },
      {
        path: "orders",
        element: (
          <Suspense fallback={<div />}>
            <OrdersPage />
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
      {
        path: "products",
        element: (
          <Suspense fallback={<div />}>
            <AdminProductsPage />
          </Suspense>
        ),
      },
      {
        path: "categories",
        element: (
          <Suspense fallback={<div />}>
            <AdminCategories />
          </Suspense>
        ),
      },
      {
        path: "brands",
        element: (
          <Suspense fallback={<div />}>
            <AdminBrands />
          </Suspense>
        ),
      },
      {
        path: "sizes",
        element: (
          <Suspense fallback={<div />}>
            <AdminSizes />
          </Suspense>
        ),
      },
      {
        path: "colors",
        element: (
          <Suspense fallback={<div />}>
            <AdminColors />
          </Suspense>
        ),
      },
      {
        path: "types",
        element: (
          <Suspense fallback={<div />}>
            <AdminTypes />
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
