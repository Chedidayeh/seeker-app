"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";


const PageBreadcrumb: React.FC = () => {
  const pathname = usePathname();

  // Function to format segment names (e.g., "adminDashboard" → "Admin Dashboard")
  const formatSegmentName = (segment: string): string => {
    const nameOverrides: Record<string, string> = {
      adminDashboard: "Admin Dashboard",
      "view-all": "View all",
    };
    return (
      nameOverrides[segment] ||
      segment
        .replace(/([A-Z])/g, " $1") // Add space before capital letters
        .replace(/^\w/, (c) => c.toUpperCase()) // Capitalize first letter
        .replace(/-/g, " ") // Replace hyphens with spaces
    );
  };

  // Generate breadcrumb items based on the current pathname
  const getBreadcrumbs = () => {
    // Split pathname and filter out empty segments and locale (e.g., "en")
    const segments = pathname
      .split("/")
      .filter((segment) => segment && !/^[a-z]{2}$/.test(segment)); // Exclude locale (e.g., "en", "fr")

    const breadcrumbs: { name: string; path: string }[] = [];
    let currentPath = pathname.split("/").slice(0, 2).join("/"); // Include locale (e.g., "/en")

    // Find index of "adminDashboard" to start breadcrumbs from there
    const adminDashboardIndex = segments.indexOf("adminDashboard");
    const relevantSegments =
      adminDashboardIndex !== -1
        ? segments.slice(adminDashboardIndex)
        : segments;

    relevantSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const name = formatSegmentName(segment);
      breadcrumbs.push({ name, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="flex flex-col gap-3 mb-6">
      <nav aria-label="breadcrumb">
        <ol className="flex items-center gap-1.5">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {index < breadcrumbs.length - 1 ? (
                <>
                  <Link
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    href={crumb.path}
                  >
                    {crumb.name}
                  </Link>
                  <svg
                    className="stroke-current text-gray-500 dark:text-gray-400"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                      stroke=""
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              ) : (
                <span className="text-sm text-gray-800 dark:text-white/90">
                  {crumb.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;