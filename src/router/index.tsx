import { SuspenseContainer } from "@/config";
import Auth from "@/pages/auth/Auth";
import Otp from "@/pages/auth/otp/Otp";
import Profile from "@/pages/auth/profile/Profile";
import MainDetail from "@/pages/detail/MainDetail";
import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import SignIn from "../pages/auth/sign-in/SignIn";
import Wishlist from "@/pages/wishlist/Wishlist";

<!-- import Cart from "@/pages/cart/Cart";
import MainContactPage from "@/pages/contact/MainContactPage";  -->

import Checkout from "@/pages/checkout/Checkout";
import Self from "@/pages/auth/profile/self/Self";
import Order from "@/pages/auth/profile/order/Order";
import MainCart from "@/pages/cart/MainCart";
import Checkout from "@/pages/checkout/Checkout";
const Home = lazy(() => import("@/pages/home/Home"));
const Shop = lazy(() => import("@/pages/shop/Shop"));
const Layout = lazy(() => import("@/pages/layout/Layout"));
const NotFound = lazy(() => import("@/pages/not-found/NotFound"));
const SignUp = lazy(() => import("@/pages/auth/sign-up/SignUp"));

const Routers = () => {
  return (
    <>
      {useRoutes([
        {
          path: "/",
          element: (
            <SuspenseContainer>
              <Layout />
            </SuspenseContainer>
          ),
          children: [
            {
              path: "/",
              element: (
                <SuspenseContainer>
                  <Home />
                </SuspenseContainer>
              ),
            },
            {
              path: "/shop",
              element: (
                <SuspenseContainer>
                  <Shop />
                </SuspenseContainer>
              ),
            },
            {
              path: "/wishlist",
              element: (
                <SuspenseContainer>
                  <Wishlist />
                </SuspenseContainer>
              ),
            },
            {
              path: "/cart",
              element: (
                <SuspenseContainer>
                  <MainCart />
                </SuspenseContainer>
              ),
            },
            {
              path: "/checkout",
              element: (
                <SuspenseContainer>
                  <Checkout />
                </SuspenseContainer>
              ),
            },
            {
              path: "/contact", 
              element: (
                <SuspenseContainer>
                  <MainContactPage />
                </SuspenseContainer>
              ),
            },
            {
              path: "/auth",
              element: (
                <SuspenseContainer>
                  <Auth />
                </SuspenseContainer>
              ),
              children: [
                {
                  path: "profile",
                  element: (
                    <SuspenseContainer>
                      <Profile />
                    </SuspenseContainer>
                  ),
                  children: [
                    {
                      path: "self",
                      element: (
                        <SuspenseContainer>
                          <Self />
                        </SuspenseContainer>
                      ),
                    },
                    {
                      path: "order",
                      element: (
                        <SuspenseContainer>
                          <Order />
                        </SuspenseContainer>
                      ),
                    },
                  ],
                },
              ],
            },
            {
              path: "product/:id",
              element: (
                <SuspenseContainer>
                  <MainDetail />
                </SuspenseContainer>
              ),
            },
            {
              path: "*",
              element: (
                <SuspenseContainer>
                  <NotFound />
                </SuspenseContainer>
              ),
            },
          ],
        },
        {
          path: "/auth/sign-up",
          element: (
            <SuspenseContainer>
              <SignUp />
            </SuspenseContainer>
          ),
        },
        {
          path: "/auth/sign-in",
          element: (
            <SuspenseContainer>
              <SignIn />
            </SuspenseContainer>
          ),
        },
        {
          path: "/auth/otp",
          element: (
            <SuspenseContainer>
              <Otp />
            </SuspenseContainer>
          ),
        },
      ])}
    </>
  );
};

export default Routers;
