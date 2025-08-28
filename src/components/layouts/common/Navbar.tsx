import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-200 shadow-md">
      <div className="flex-none lg:hidden">
        {/* Drawer toggle for mobile */}
        <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
      </div>
      <div className="flex-1 px-2">
        <a className="text-lg font-bold">New Vision Art & Science Institute</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-ghost">Login</button>
      </div>
    </div>
  );
};

export default Navbar;
