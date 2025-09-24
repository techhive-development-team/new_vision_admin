import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import Loading from "../components/layouts/common/Loading";
import { client } from "../repositories/client";

// Lazy loading helper
const lazyLoad = (path: string) => lazy(() => import(path));

// Route interface
interface AppRoute {
  path: string;
  element: React.LazyExoticComponent<React.ComponentType<any>>;
  index?: boolean;
  protected?: boolean;
}

const ProtectedRoute: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setIsAuth(false);

      try {
        const res = await client.exec("/auth/verify-token", { method: "GET" });
        setIsAuth(res?.success ?? false);
      } catch {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) return <Loading />;

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

const routes: AppRoute[] = [
  {
    path: "/",
    element: lazyLoad("../pages/Dashboard"),
    index: true,
    protected: true,
  },

  { path: "/users", element: lazyLoad("../pages/User/User"), protected: true },
  {
    path: "/users/create",
    element: lazyLoad("../pages/User/Create/UserCreate"),
    protected: false,
  },
  {
    path: "/users/:id/edit",
    element: lazyLoad("../pages/User/Edit/UserEdit"),
    protected: true,
  },

  {
    path: "/images",
    element: lazyLoad("../pages/Image/Image"),
    protected: true,
  },
  {
    path: "/images/create",
    element: lazyLoad("../pages/Image/Create/ImageCreate"),
    protected: true,
  },
  {
    path: "/images/:id/edit",
    element: lazyLoad("../pages/Image/Edit/ImageEdit"),
    protected: true,
  },

  {
    path: "/imagetypes",
    element: lazyLoad("../pages/ImageType/ImageType"),
    protected: true,
  },
  {
    path: "/imagetypes/create",
    element: lazyLoad("../pages/ImageType/Create/ImageTypeCreate"),
    protected: true,
  },
  {
    path: "/imagetypes/:id/edit",
    element: lazyLoad("../pages/ImageType/Edit/ImageTypeEdit"),
    protected: true,
  },
  {
    path: "/happeningtypes",
    element: lazyLoad("../pages/HappeningType/HappeningType"),
    protected: true,
  },
  {
    path: "/happeningtypes/create",
    element: lazyLoad("../pages/HappeningType/Create/HappeningTypeCreate"),
    protected: true,
  },
  {
    path: "/happeningtypes/:id/edit",
    element: lazyLoad("../pages/HappeningType/Edit/HappeningTypeEdit"),
    protected: true,
  },
  {
    path: "/education-partners",
    element: lazyLoad("../pages/EducationPartner/EducationPartner"),
    protected: true,
  },
  {
    path: "/education-partners/create",
    element: lazyLoad(
      "../pages/EducationPartner/Create/EducationPartnerCreate"
    ),
    protected: true,
  },
  {
    path: "/education-partners/:id/edit",
    element: lazyLoad("../pages/EducationPartner/Edit/EducationPartnerEdit"),
    protected: true,
  },

  {
    path: "/courses/create",
    element: lazyLoad("../pages/Course/Create/CourseCreate"),
    protected: true,
  },
  {
    path: "/courses/:id/edit",
    element: lazyLoad("../pages/Course/Edit/CourseEdit"),
    protected: true,
  },
  {
    path: "/courses",
    element: lazyLoad("../pages/Course/Course"),
    protected: true,
  },

  //StudentReview
  {
    path: "/studentReview",
    element: lazyLoad("../pages/StudentReview/StudentReview"),
    protected: true,
  },
  {
    path: "/studentReview/create",
    element: lazyLoad("../pages/StudentReview/Create/StudentReviewCreate"),
    protected: true,
  },
  {
    path: "/studentReview/:id/edit",
    element: lazyLoad("../pages/StudentReview/Edit/StudentReviewEdit"),
    protected: true,
  },

  {
    path: "/happenings",
    element: lazyLoad("../pages/Happening/Happening"),
    protected: true,
  },
  {
    path: "/happenings/create",
    element: lazyLoad("../pages/Happening/Create/HappeningCreate"),
    protected: true,
  },
  {
    path: "/happenings/:id/edit",
    element: lazyLoad("../pages/Happening/Edit/HappeningEdit"),
    protected: true,
  },

  //inquiry
  {
    path: "/inquiry",
    element: lazyLoad("../pages/Inquiry/Inquiry"),
    protected: true,
  },
  {
    path: "/inquiry/view",
    element: lazyLoad("../pages/Inquiry/View/InquiryView"),
    protected: true,
  },
  {
    path: "/inquiry/create",
    element: lazyLoad("../pages/Inquiry/Create/InquiryCreate"),
    protected: true,
  },

  //student
  {
    path: "/students",
    element: lazyLoad("../pages/Student/Student"),
    protected: true,
  },
  {
    path: "/students/:id/edit",
    element: lazyLoad("../pages/Student/Edit/StudentEdit"),
    protected: true,
  },
  {
    path: "/students/:id/view",
    element: lazyLoad("../pages/Student/View/StudentView"),
    protected: true,
  },

  { path: "/login", element: lazyLoad("../pages/auth/Login/Login") },

  { path: "*", element: lazyLoad("../pages/NotFound") },
];

const generateRoutes = (routes: AppRoute[]) =>
  routes.map((route) =>
    route.protected ? (
      <Route element={<ProtectedRoute />} key={route.path}>
        <Route
          index={route.index}
          path={route.path}
          element={<route.element />}
        />
      </Route>
    ) : (
      <Route
        key={route.path}
        index={route.index}
        path={route.path}
        element={<route.element />}
      />
    )
  );

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
