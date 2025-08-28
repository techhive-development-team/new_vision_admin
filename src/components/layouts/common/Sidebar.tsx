import React from "react";

const Sidebar = () => {
  return (
    <ul className="menu p-4 w-64 min-h-full bg-base-100">
      <li>
        <a>Dashboard</a>
      </li>
      <li>
        <a>Profile</a>
      </li>
      <li>
        <a>Settings</a>
      </li>
    </ul>
  );
};

export default Sidebar;
