// routes/NewVisionRoutes.tsx
import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import AppProvider from "../components/layouts/AppProvider.tsx"; // ✅ renamed

const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));
const User = lazy(() => import("../pages/User/User"));

const renderFallback = () => (
  <Box
    sx={{
      display: "flex",
      flex: "1 1 auto",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
      }}
    />
  </Box>
);

const NewVisionRoutes = () => {
  const router = createBrowserRouter([
    {
      Component: () => (
        <AppProvider>
          <Outlet />
        </AppProvider>
      ),
      children: [
        {
          element: (
            <Layout>
              <Suspense fallback={renderFallback()}>
                <Outlet />
              </Suspense>
            </Layout>
          ),
          children: [
            { index: true, element: <Dashboard /> },
            { path: "user", element: <User /> },
            { path: "*", element: <NotFound /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default NewVisionRoutes;
