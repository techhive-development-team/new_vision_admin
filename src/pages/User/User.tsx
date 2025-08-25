import React from "react";
import { useGetUser } from "../../hooks/useGetUser";

const User = () => {
  const { data } = useGetUser();
  return <div>User</div>;
};

export default User;
