import { NavLink, useLocation } from "react-router-dom";
import { sidebarRoutes } from "./sidebarRoutes";

const Sidebar = () => {
  const location = useLocation();
  const closeDrawer = () => {
    const drawer = document.getElementById("my-drawer") as HTMLInputElement;
    if (drawer && drawer.checked) drawer.checked = false;
  };

  return (
    <div className="w-60 bg-base-100 h-full min-h-screen">
      <ul className="menu pt-2 space-y-2">
        {sidebarRoutes.map((route, index) => (
          <li key={index} className="relative">
            <NavLink
              end
              to={route.path}
              onClick={closeDrawer}
              className={({ isActive }) =>
                `${isActive ? "font-semibold bg-base-200" : "font-normal"}`
              }
            >
              {route.icon} {route.name}
              {location.pathname === route.path && (
                <span
                  className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary"
                  aria-hidden="true"
                />
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
