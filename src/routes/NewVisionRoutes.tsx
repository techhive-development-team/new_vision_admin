import React, { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));

const NewVisionRoutes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index path="/" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default NewVisionRoutes;
