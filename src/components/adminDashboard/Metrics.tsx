"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  UserIcon,
  BriefcaseIcon,
  TagIcon,
  MessageCircleIcon,
} from "lucide-react";

const metricsData = [
  {
    title: "Registered Professionals",
    value: 1245,
    change: 8.2,
    trend: "up",
    icon: <BriefcaseIcon className="text-white w-4 h-4" />,
    iconBg: "bg-gradient-to-tr from-indigo-500 to-purple-500",
  },
  {
    title: "Active Users",
    value: 3782,
    change: 11.0,
    trend: "up",
    icon: <UserIcon className="text-white w-4 h-4" />,
    iconBg: "bg-gradient-to-tr from-green-400 to-teal-500",
  },
  {
    title: "Service Categories",
    value: 56,
    change: 2.5,
    trend: "up",
    icon: <TagIcon className="text-white w-4 h-4" />,
    iconBg: "bg-gradient-to-tr from-yellow-400 to-orange-500",
  },
  {
    title: "Contacts Sent",
    value: 872,
    change: 5.6,
    trend: "down",
    icon: <MessageCircleIcon className="text-white w-4 h-4" />,
    iconBg: "bg-gradient-to-tr from-red-400 to-pink-500",
  },
];

export const Metrics = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
      {metricsData.map((metric, index) => (
        <div
          key={index}
          className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-4 shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          {/* Icon */}
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-xl ${metric.iconBg}`}
          >
            {metric.icon}
          </div>

          {/* Metric Info */}
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {metric.title}
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-3xl dark:text-white/90">
                {metric.value.toLocaleString()}
              </h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
