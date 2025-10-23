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

// --------------------
// Lazy-loaded Pages
// --------------------
const Dashboard = lazy(() => import("../pages/Dashboard"));

// Users
const UserPage = lazy(() => import("../pages/User/User"));
const UserCreate = lazy(() => import("../pages/User/Create/UserCreate"));
const UserEdit = lazy(() => import("../pages/User/Edit/UserEdit"));

// Images
const ImagePage = lazy(() => import("../pages/Image/Image"));
const ImageCreate = lazy(() => import("../pages/Image/Create/ImageCreate"));
const ImageEdit = lazy(() => import("../pages/Image/Edit/ImageEdit"));

// Image Types
const ImageTypePage = lazy(() => import("../pages/ImageType/ImageType"));
const ImageTypeCreate = lazy(
  () => import("../pages/ImageType/Create/ImageTypeCreate")
);
const ImageTypeEdit = lazy(
  () => import("../pages/ImageType/Edit/ImageTypeEdit")
);

// Happening Types
const HappeningTypePage = lazy(
  () => import("../pages/HappeningType/HappeningType")
);
const HappeningTypeCreate = lazy(
  () => import("../pages/HappeningType/Create/HappeningTypeCreate")
);
const HappeningTypeEdit = lazy(
  () => import("../pages/HappeningType/Edit/HappeningTypeEdit")
);

// Education Partners
const EducationPartnerPage = lazy(
  () => import("../pages/EducationPartner/EducationPartner")
);
const EducationPartnerCreate = lazy(
  () => import("../pages/EducationPartner/Create/EducationPartnerCreate")
);
const EducationPartnerEdit = lazy(
  () => import("../pages/EducationPartner/Edit/EducationPartnerEdit")
);

// Courses
const CoursePage = lazy(() => import("../pages/Course/Course"));
const CourseCreate = lazy(() => import("../pages/Course/Create/CourseCreate"));
const CourseEdit = lazy(() => import("../pages/Course/Edit/CourseEdit"));

// Student Reviews
const StudentReviewPage = lazy(
  () => import("../pages/StudentReview/StudentReview")
);
const StudentReviewCreate = lazy(
  () => import("../pages/StudentReview/Create/StudentReviewCreate")
);
const StudentReviewEdit = lazy(
  () => import("../pages/StudentReview/Edit/StudentReviewEdit")
);

// Happenings
const HappeningPage = lazy(() => import("../pages/Happening/Happening"));
const HappeningCreate = lazy(
  () => import("../pages/Happening/Create/HappeningCreate")
);
const HappeningEdit = lazy(
  () => import("../pages/Happening/Edit/HappeningEdit")
);

//FutureCountry
const FutureCountryPage = lazy(
  () => import("../pages/FutureCountry/FutureCountry")
);
const FutureCountryCreate = lazy(
  () => import("../pages/FutureCountry/Create/FutureCountryCreate")
);
const FutureCountryEdit = lazy(
  () => import("../pages/FutureCountry/Edit/FutureCountryEdit")
);

const Inquiry = lazy(() => import("../pages/Inquiry/Inquiry"));
const InquiryCreate = lazy(
  () => import("../pages/Inquiry/Create/InquiryCreate")
);
const InquiryView = lazy(() => import("../pages/Inquiry/View/InquiryView"));

const Student = lazy(() => import("../pages/Student/Student"));
const StudentEdit = lazy(() => import("../pages/Student/Edit/StudentEdit"));
const StudentView = lazy(() => import("../pages/Student/View/StudentView"));

// Auth & NotFound
const Login = lazy(() => import("../pages/Auth/Login/Login"));
const NotFound = lazy(() => import("../pages/NotFound"));

// --------------------
// Protected Route
// --------------------
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

// --------------------
// Routes Definition
// --------------------
interface AppRoute {
  path: string;
  element: React.LazyExoticComponent<React.ComponentType<any>>;
  index?: boolean;
  protected?: boolean;
}

const routes: AppRoute[] = [
  { path: "/", element: Dashboard, index: true, protected: true },

  { path: "/users", element: UserPage, protected: true },
  { path: "/users/create", element: UserCreate, protected: false},
  { path: "/users/:id/edit", element: UserEdit, protected: true },

  { path: "/images", element: ImagePage, protected: true },
  { path: "/images/create", element: ImageCreate, protected: true },
  { path: "/images/:id/edit", element: ImageEdit, protected: true },

  { path: "/imagetypes", element: ImageTypePage, protected: true },
  { path: "/imagetypes/create", element: ImageTypeCreate, protected: true },
  { path: "/imagetypes/:id/edit", element: ImageTypeEdit, protected: true },

  { path: "/happeningtypes", element: HappeningTypePage, protected: true },
  {
    path: "/happeningtypes/create",
    element: HappeningTypeCreate,
    protected: true,
  },
  {
    path: "/happeningtypes/:id/edit",
    element: HappeningTypeEdit,
    protected: true,
  },

  {
    path: "/education-partners",
    element: EducationPartnerPage,
    protected: true,
  },
  {
    path: "/education-partners/create",
    element: EducationPartnerCreate,
    protected: true,
  },
  {
    path: "/education-partners/:id/edit",
    element: EducationPartnerEdit,
    protected: true,
  },

  { path: "/courses", element: CoursePage, protected: true },
  { path: "/courses/create", element: CourseCreate, protected: true },
  { path: "/courses/:id/edit", element: CourseEdit, protected: true },

  { path: "/studentReview", element: StudentReviewPage, protected: true },
  {
    path: "/studentReview/create",
    element: StudentReviewCreate,
    protected: true,
  },
  {
    path: "/studentReview/:id/edit",
    element: StudentReviewEdit,
    protected: true,
  },

  { path: "/happenings", element: HappeningPage, protected: true },
  { path: "/happenings/create", element: HappeningCreate, protected: true },
  { path: "/happenings/:id/edit", element: HappeningEdit, protected: true },

  //inquiry
  {
    path: "/inquiry",
    element: Inquiry,
    protected: true,
  },
  {
    path: "/inquiry/view",
    element: InquiryView,
    protected: true,
  },
  {
    path: "/inquiry/create",
    element: InquiryCreate,
    protected: true,
  },

  //student
  {
    path: "/students",
    element: Student,
    protected: true,
  },
  {
    path: "/students/:id/edit",
    element: StudentEdit,
    protected: true,
  },
  {
    path: "/students/:id/view",
    element: StudentView,
    protected: true,
  },

  { path: "/futureCountry", element: FutureCountryPage, protected: true },
  {
    path: "/futureCountry/create",
    element: FutureCountryCreate,
    protected: true,
  },
  {
    path: "/futureCountry/:id/edit",
    element: FutureCountryEdit,
    protected: true,
  },

  { path: "/login", element: Login },
  { path: "*", element: NotFound },
];

// --------------------
// Generate Routes
// --------------------
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
