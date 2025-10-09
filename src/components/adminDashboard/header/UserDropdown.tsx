"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideLogOut, Settings, User } from "lucide-react";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center text-gray-700 dark:text-gray-400 focus:outline-none"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="mr-1 overflow-hidden rounded-full h-11 w-11">
            <Image width={44} height={44} src="/chedi.jpg" alt="User" />
          </span>

          <svg
            className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""
              }`}
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[260px] mt-4 rounded-2xl border border-gray-200 dark:border-gray-800 p-3 shadow-lg bg-white dark:bg-gray-950"
      >
        {/* Header */}
        <DropdownMenuLabel className="p-0">
          <div>
            <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-200">
              Musharof Chowdhury
            </span>
            <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
              randomuser@pimjo.com
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-2 border-gray-200 dark:border-gray-800" />

        {/* Menu items */}
        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-gray-700 group text-theme-sm hover:bg-gray-100 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-gray-100"
          >

            <User className="text-muted-foreground" />
            Edit profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-gray-700 group text-theme-sm hover:bg-gray-100 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-gray-100"
          >
            <Settings className="text-muted-foreground" />
            Account settings
          </Link>
        </DropdownMenuItem>


        <DropdownMenuSeparator className="my-2 border-gray-200 dark:border-gray-800" />

        <DropdownMenuItem asChild>
          <Link
            href="/signin"
            className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-gray-700 group text-theme-sm hover:bg-gray-100 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-gray-100"
          >
            <LucideLogOut className="text-muted-foreground" />

            Sign out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
