import React, { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));
const UserCreate = lazy(() => import("../pages/User/Create/UserCreate"));
const UserEdit = lazy(() => import("../pages/User/Edit/UserEdit"));
const User = lazy(() => import("../pages/User/User"));

const NewVisionRoutes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index path="/" element={<Dashboard />} />
        <Route path="/users/create" element={<UserCreate />} />
        <Route path="/users" element={<User />} />
        <Route path="/users/:id/edit" element={<UserEdit />} />
        <Route path="*" element={<NotFound />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default NewVisionRoutes;
