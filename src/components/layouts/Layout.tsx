import React from "react";
import MainNav from "./includes/MainNav";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <MainNav />
      {children}
    </div>
  );
};

export default Layout;
