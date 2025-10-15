import type { ReactNode } from "react";
import {
  Home,
  Users,
  Image,
  BookOpen,
  Building2,
  Calendar1,
  MessageSquare,
  MailSearch,
  PersonStanding,
  Layers2,
  ClipboardList,
} from "lucide-react";

export interface SidebarRoute {
  path: string;
  name: string;
  icon: ReactNode;
}

export const sidebarRoutes: SidebarRoute[] = [
  { path: "/", name: "Dashboard", icon: <Home size={18} /> },
  { path: "/users", name: "Users", icon: <Users size={18} /> },
  { path: "/images", name: "Images", icon: <Image size={18} /> },
  { path: "/imagetypes", name: "Image Types", icon: <BookOpen size={18} /> },
  {
    path: "/happeningtypes",
    name: "Happening Types",
    icon: <BookOpen size={18} />,
  },
  { path: "/happenings", name: "Happenings", icon: <Calendar1 size={18} /> },
  {
    path: "/education-partners",
    name: "Education Partners",
    icon: <Building2 size={18} />,
  },
  {
    path: "/studentReview",
    name: "Student Review",
    icon: <MessageSquare size={18} />,
  },
  { path: "/courses", name: "Courses", icon: <BookOpen size={18} /> },
  { path: "/inquiry", name: "Inquiry", icon: <MailSearch size={18} /> },
  { path: "/students", name: "Student", icon: <PersonStanding size={18} /> },
  {path: "/futureCountry", name: "Future Country", icon: <Users size={18} /> },
  { path: "/batches", name: "Batches", icon: <Layers2 size={18} /> },
  { path: "/registrations", name: "Registrations", icon: <ClipboardList size={18} /> },
];
