import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Loading from "../components/layouts/common/Loading";

const lazyLoad = (path: string) => lazy(() => import(path));

interface AppRoute {
  path: string;
  element: React.LazyExoticComponent<React.ComponentType<any>>;
  index?: boolean;
}

const routes: AppRoute[] = [
  { path: "/", element: lazyLoad("../pages/Dashboard"), index: true },

  { path: "/users", element: lazyLoad("../pages/User/User") },
  {
    path: "/users/create",
    element: lazyLoad("../pages/User/Create/UserCreate"),
  },
  { path: "/users/:id/edit", element: lazyLoad("../pages/User/Edit/UserEdit") },

  { path: "/images", element: lazyLoad("../pages/Image/Image") },
  {
    path: "/images/create",
    element: lazyLoad("../pages/Image/Create/ImageCreate"),
  },
  {
    path: "/images/:id/edit",
    element: lazyLoad("../pages/Image/Edit/ImageEdit"),
  },

  { path: "*", element: lazyLoad("../pages/NotFound") },
];

const generateRoutes = (routes: AppRoute[]) =>
  routes.map((route) => (
    <Route
      key={route.path}
      index={route.index}
      path={route.path}
      element={<route.element />}
    />
  ));

const NewVisionRoutes: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(<>{generateRoutes(routes)}</>)
  );

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default NewVisionRoutes;
