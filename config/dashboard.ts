import { DashboardConfig } from "types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
    },
    {
      title: "Customers",
      href: "/dashboard/customers",
      icon: "users",
    },
    {
      title: "Products & Services",
      href: "/dashboard/products",
      icon: "package",
    },
    {
      title: "Invoices",
      href: "/dashboard/invoices",
      icon: "billing",
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: "post",
    },

    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: "settings",
    },
    {
      title: "Upgrade to Plus",
      href: "/dashboard/billing",
      icon: "settings",
    },
  ],
};
