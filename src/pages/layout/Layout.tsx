import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import NetworkStatus from "@/components/network-status/NetworkStatus";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <NetworkStatus />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
};

export default React.memo(Layout);
