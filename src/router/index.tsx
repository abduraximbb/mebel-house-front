import { SuspenseContainer } from "@/config";
import { lazy } from "react";
import { useRoutes } from "react-router-dom";
const Home = lazy(() => import("@/pages/home/Home"));
const Shop = lazy(() => import("@/pages/shop/Shop"));
const Layout = lazy(() => import("@/pages/layout/Layout"));
const NotFound = lazy(() => import("@/pages/not-found/NotFound"));
const SignUp = lazy(() => import("@/pages/sign-up/SignUp"));

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
              path: "/account",
              element: (
                <SuspenseContainer>
                  <SignUp />
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
      ])}
    </>
  );
};

export default Routers;
