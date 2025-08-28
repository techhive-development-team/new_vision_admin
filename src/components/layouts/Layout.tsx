import React from "react";
import Navbar from "./common/Navbar";
import Sidebar from "./common/Sidebar";
import Breadcrumb from "./common/Breadcrumb";
import { Link } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Navbar />
        <main className="p-4">
          {children}
        </main>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
};

export default Layout;
