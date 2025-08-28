import React from "react";
import { useGetUser } from "../../hooks/useGetUser";
import MUISidebarLayout from "../../components/layouts/MUILayout";

const User = () => {
  const { data } = useGetUser();
  return <>User</>;
};

export default User;
