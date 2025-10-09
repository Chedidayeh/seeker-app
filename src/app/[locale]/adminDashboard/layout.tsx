"use client";


import React from "react";
import { useSidebar } from "@/contexts/SidebarContext";
import AppSidebar from "../../../components/adminDashboard/sidebar/AppSidebar";
import Backdrop from "../../../components/adminDashboard/sidebar/Backdrop";
import AppHeader from "../../../components/adminDashboard/header/AppHeader";
import PageBreadcrumb from "../../../components/adminDashboard/PageBreadCrumb";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[80px]";

  return (
    <div className="min-h-screen xl:flex bg-white dark:bg-gray-900">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 bg-white dark:bg-gray-900 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto  max-w-(--breakpoint-2xl) md:p-6">
        <PageBreadcrumb />

          {children}
          </div>
      </div>
    </div>
  );
}
