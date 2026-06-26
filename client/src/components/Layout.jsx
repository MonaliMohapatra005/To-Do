import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  // return (
  //   <div className="max-w-screen-sm mx-auto mt-10 p-5 shadow-sm border rounded">
  //     <ToastContainer />
  //     <Navigation />
  //     <Outlet />
  //   </div>
  // );
  



  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <ToastContainer />

      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow max-w-screen-sm mx-auto w-full mt-10 p-5 shadow-sm border rounded bg-white">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );

};

export default Layout;