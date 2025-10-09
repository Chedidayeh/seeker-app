"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";

export default function NotificationDropdown() {
  const [notifying, setNotifying] = useState(true);

  const handleOpenChange = (open: boolean) => {
    if (open) setNotifying(false);
  };

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-700 h-11 w-11 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          {notifying && (
            <span className="absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full bg-orange-400">
              <span className="absolute inline-flex w-full h-full bg-orange-400 rounded-full opacity-75 animate-ping"></span>
            </span>
          )}
          <Bell className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="z-50 mt-2 w-[360px] rounded-2xl border border-gray-200 p-3 shadow-lg dark:border-gray-800 dark:bg-gray-950"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700">
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Notifications
          </h5>
        </div>

        {/* Notification list */}
        <div className="flex flex-col max-h-[400px] overflow-y-auto custom-scrollbar">
          {[
            {
              name: "Terry Franci",
              image: "/images/user/user-02.jpg",
              status: "success",
              message: "requests permission to change Project - Nganter App",
              time: "5 min ago",
            },
            {
              name: "Alena Franci",
              image: "/images/user/user-03.jpg",
              status: "success",
              message: "requests permission to change Project - Nganter App",
              time: "8 min ago",
            },
            {
              name: "Jocelyn Kenter",
              image: "/images/user/user-04.jpg",
              status: "success",
              message: "requests permission to change Project - Nganter App",
              time: "15 min ago",
            },
            {
              name: "Brandon Philips",
              image: "/images/user/user-05.jpg",
              status: "error",
              message: "requests permission to change Project - Nganter App",
              time: "1 hr ago",
            },
          ].map((item, i) => (
            <DropdownMenuItem
              key={i}
              className="flex gap-3 items-start rounded-lg border-b border-gray-100 p-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5 cursor-pointer"
            >
              <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
                <Image
                  width={40}
                  height={40}
                  src={item.image}
                  alt={item.name}
                  className="w-full overflow-hidden rounded-full"
                />
                <span
                  className={`absolute bottom-0 right-0 z-10 h-2.5 w-2.5 rounded-full border-[1.5px] border-white dark:border-gray-900 ${
                    item.status === "success"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                ></span>
              </span>

              <div className="flex flex-col">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium text-gray-800 dark:text-white">
                    {item.name}
                  </span>{" "}
                  {item.message}
                </p>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {item.time}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
        </div>


        {/* Footer */}
        <Link
          href="/"
          className="block px-4 mt-4 py-2 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          View all Notifications
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
