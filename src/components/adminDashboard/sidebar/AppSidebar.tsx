"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  List,
  PieChart,
  Box,
  ChevronDown,
  Sparkles,
  LogOut,
  Settings,
} from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";


type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string }[];
};

const navItems: NavItem[] = [
  {
    icon: <LayoutDashboard size={18} className="text-muted-foreground" />,
    name: "Dashboard",
    path: "/adminDashboard",
  },
  {
    icon: <PieChart size={18} className="text-muted-foreground" />,
    name: "Insights",
    path: "/adminDashboard/insights",
  },
  {
    name: "Categories",
    icon: <Box size={18} className="text-muted-foreground" />,
    subItems: [
      { name: "View all", path: "/adminDashboard/categories" },
      { name: "Create", path: "/adminDashboard/categories/create" },
    ],
  },
  {
    name: "Professionals",
    icon: <List size={18} className="text-muted-foreground" />,
    subItems: [
      { name: "View all", path: "/adminDashboard/professionals" },
      { name: "Create", path: "/adminDashboard/professionals/create" },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Determine if a path is active, accounting for locale prefix (e.g., /en/)
  const isActive = useCallback(
    (path: string) => {
      const normalizedPathname = pathname.replace(/^\/[a-z]{2}\//, "/");
      return normalizedPathname === path;
    },
    [pathname]
  );

  // Check if a parent item should be active (i.e., any subitem is active)
  const isParentActive = useCallback(
    (subItems?: { name: string; path: string }[]) => {
      return subItems?.some((sub) => isActive(sub.path)) || false;
    },
    [isActive]
  );

  // Set the initial open submenu based on the current route
  useEffect(() => {
    let matchedIndex: number | null = null;
    navItems.forEach((nav, index) => {
      if (nav.path && isActive(nav.path)) {
        matchedIndex = null; // Top-level item is active, no submenu open
      } else if (isParentActive(nav.subItems)) {
        matchedIndex = index; // Subitem is active, open parent submenu
      }
    });
    // Only set openSubmenu if the sidebar is expanded, hovered, or mobile open
    if (isExpanded || isHovered || isMobileOpen) {
      setOpenSubmenu(matchedIndex);
    } else {
      setOpenSubmenu(null); // Close submenus when sidebar is collapsed
    }
  }, [pathname, isActive, isParentActive, isExpanded, isHovered, isMobileOpen]);

  // Update submenu height when opened
  useEffect(() => {
    if (openSubmenu !== null && subMenuRefs.current[openSubmenu]) {
      setSubMenuHeight((prev) => ({
        ...prev,
        [openSubmenu]: subMenuRefs.current[openSubmenu]?.scrollHeight || 0,
      }));
    }
  }, [openSubmenu]);

  // Close submenus when sidebar is collapsed
  useEffect(() => {
    if (!isExpanded && !isHovered && !isMobileOpen) {
      setOpenSubmenu(null); // Close all submenus when sidebar is fully collapsed
    }
  }, [isExpanded, isHovered, isMobileOpen]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prev) => (prev === index ? null : index));
  };

  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-3">
      {items.map((nav, index) => {
        // Determine if the current item or its subitems are active
        const isItemActive = nav.path ? isActive(nav.path) : isParentActive(nav.subItems);
        
        // Clone the icon with dynamic className based on active state
        const iconWithDynamicColor = React.cloneElement(nav.icon as React.ReactElement, {
          className: isItemActive ? "text-white" : "text-muted-foreground",
        });

        return (
          <li key={nav.name}>
            {nav.subItems ? (
              <>
                <button
                  onClick={() => handleSubmenuToggle(index)}
                  className={`flex items-center w-full px-4 py-2.5 rounded-xl transition-all duration-200
                    ${
                      isParentActive(nav.subItems)
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                >
                  <span className="mr-2">{iconWithDynamicColor}</span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <>
                      <span className="font-medium text-sm">{nav.name}</span>
                      <ChevronDown
                        className={`ml-auto w-4 h-4 transition-transform ${
                          openSubmenu === index ? "rotate-180" : ""
                        }`}
                      />
                    </>
                  )}
                </button>
                <div
                  ref={(el) => {
                    subMenuRefs.current[index] = el;
                  }}
                  className="overflow-hidden transition-all duration-300 ml-4"
                  style={{
                    height:
                      openSubmenu === index
                        ? `${subMenuHeight[index]}px`
                        : "0px",
                  }}
                >
                  <ul className="mt-2 space-y-1 border-l border-gray-300 dark:border-gray-700 pl-4">
                    {nav.subItems.map((sub) => (
                      <li key={sub.name}>
                        <Link
                          href={sub.path}
                          className={`relative block text-sm py-1.5 pl-2 pr-3 rounded-md transition-all duration-200
                            ${
                              isActive(sub.path)
                                ? "text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/30"
                                : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800"
                            } group`}
                        >
                          <span
                            className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-blue-600 transition-all duration-200
                              ${
                                isActive(sub.path)
                                  ? "opacity-100"
                                  : "opacity-0 group-hover:opacity-100"
                              }`}
                          ></span>
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <Link
                href={nav.path!}
                className={`flex items-center w-full px-4 py-2.5 rounded-xl transition-all duration-200
                  ${
                    isActive(nav.path!)
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
              >
                <span className="mr-2">{iconWithDynamicColor}</span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="font-medium text-sm">{nav.name}</span>
                )}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col justify-between lg:mt-0 top-0 left-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out z-50
        ${isExpanded || isHovered || isMobileOpen ? "w-[290px]" : "w-[80px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div className="flex items-center justify-center gap-2 py-6 mb-1 border-gray-200 dark:border-gray-800">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          {(isExpanded || isHovered || isMobileOpen) && (
            <span className="font-semibold text-lg text-gray-900 dark:text-white">
              Seeker
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3.5">{renderMenuItems(navItems)}</nav>
    </aside>
  );
};

export default AppSidebar;