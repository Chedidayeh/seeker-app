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
} from "lucide-react";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet";

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

export function MobileSidebar() {
    const pathname = usePathname();
    const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const isActive = useCallback(
        (path: string) => {
            const normalizedPathname = pathname.replace(/^\/[a-z]{2}\//, "/");
            return normalizedPathname === path;
        },
        [pathname]
    );

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
                matchedIndex = null;
            } else if (isParentActive(nav.subItems)) {
                matchedIndex = index;
            }
        });
        setOpenSubmenu(matchedIndex);
    }, [pathname, isActive, isParentActive]);

    useEffect(() => {
        if (openSubmenu !== null && subMenuRefs.current[openSubmenu]) {
            setSubMenuHeight((prev) => ({
                ...prev,
                [openSubmenu]: subMenuRefs.current[openSubmenu]?.scrollHeight || 0,
            }));
        }
    }, [openSubmenu]);

    const handleSubmenuToggle = (index: number) => {
        setOpenSubmenu((prev) => (prev === index ? null : index));
    };

    const renderMenuItems = (items: NavItem[]) => (
        <ul className="flex flex-col gap-3">
            {items.map((nav, index) => {
                const isItemActive = nav.path ? isActive(nav.path) : isParentActive(nav.subItems);
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
                    ${isParentActive(nav.subItems)
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        }`}
                                >
                                    <span className="mr-2">{iconWithDynamicColor}</span>
                                    <>
                                        <span className="font-medium text-sm">{nav.name}</span>
                                        <ChevronDown
                                            className={`ml-auto w-4 h-4 transition-transform ${openSubmenu === index ? "rotate-180" : ""
                                                }`}
                                        />
                                    </>
                                </button>
                                <div
                                    ref={(el) => {
                                        subMenuRefs.current[index] = el;
                                    }}
                                    className="overflow-hidden transition-all duration-300 ml-4"
                                    style={{
                                        height: openSubmenu === index ? `${subMenuHeight[index]}px` : "0px",
                                    }}
                                >
                                    <ul className="mt-2 space-y-1 border-l border-gray-300 dark:border-gray-700 pl-4">
                                        {nav.subItems.map((sub) => (
                                            <li key={sub.name}>
                                                <Link
                                                    href={sub.path}
                                                    className={`relative block text-sm py-1.5 pl-2 pr-3 rounded-md transition-all duration-200
                            ${isActive(sub.path)
                                                            ? "text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/30"
                                                            : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800"
                                                        } group`}
                                                >
                                                                                    <SheetClose>

                                                    <span
                                                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-blue-600 transition-all duration-200
                              ${isActive(sub.path)
                                                                ? "opacity-100"
                                                                : "opacity-0 group-hover:opacity-100"
                                                            }`}
                                                    ></span>
                                                    {sub.name}
                                                    </SheetClose>
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
                  ${isActive(nav.path!)
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                            >
                                <SheetClose className="flex items-center">

                                    <span className="mr-2">{iconWithDynamicColor}</span>
                                    <span className="font-medium text-sm">{nav.name}</span>
                                </SheetClose>
                            </Link>
                        )}
                    </li>
                );
            })}
        </ul>
    );

    return (
        <Sheet>
            <SheetTrigger className="text-gray-500 cursor-pointer flex lg:hidden dark:text-gray-400" asChild>
                <svg
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
                        fill="currentColor"
                    />
                </svg>
            </SheetTrigger>
            <SheetContent side={"left"} className="w-full bg-white dark:bg-gray-900">
                <SheetHeader>
                    <SheetTitle>
                        <div className="flex items-center justify-center gap-2 py-6 mb-1 border-gray-200 dark:border-gray-800">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                                    <Sparkles className="text-white w-5 h-5" />
                                </div>
                                <span className="font-semibold text-lg text-gray-900 dark:text-white">
                                    Seeker
                                </span>
                            </Link>
                        </div>
                    </SheetTitle>
                </SheetHeader>
                <nav className="flex-1 overflow-y-auto px-3.5">{renderMenuItems(navItems)}</nav>
            </SheetContent>
        </Sheet>
    );
}
