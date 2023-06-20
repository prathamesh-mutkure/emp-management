import { DashboardConfig } from "types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    // {
    //   title: "Documentation",
    //   href: "/docs",
    // },
    // {
    //   title: "Support",
    //   href: "/support",
    //   disabled: true,
    // },
  ],
  sidebarNav: [
    {
      title: "Employees",
      href: "/employees",
      icon: "users",
    },
    {
      title: "Add Employees",
      href: "/employees/add",
      icon: "userPlus",
    },
    {
      title: "Department",
      href: "/departments",
      icon: "dashboard",
    },
    {
      title: "Add Departments",
      href: "/departments/add",
      icon: "plusCircle",
    },
  ],
};
