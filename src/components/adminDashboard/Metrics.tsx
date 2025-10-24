import React from "react";
import {
  BriefcaseIcon,
  TagIcon,
  BarChart3Icon,
  EyeIcon,
} from "lucide-react";
import { getDashboardMetrics } from "@/actions/metrics";

export const Metrics = async () => {
  const metrics = await getDashboardMetrics();

  const metricsData = [
    {
      title: "Total Professionals",
      value: metrics.totalProfessionals,
      description: "Verified professionals across all service fields",
      icon: <BriefcaseIcon className="text-white w-4 h-4" />,
      iconBg: "bg-gradient-to-tr from-indigo-500 to-purple-500",
    },
    {
      title: "Total Categories",
      value: metrics.totalCategories,
      description: "Active service categories available on Seeker",
      icon: <TagIcon className="text-white w-4 h-4" />,
      iconBg: "bg-gradient-to-tr from-yellow-400 to-orange-500",
    },
    {
      title: "Professionals per Category",
      value: metrics.professionalsPerCategory.toFixed(1),
      description: "Average number of professionals in each category",
      icon: <BarChart3Icon className="text-white w-4 h-4" />,
      iconBg: "bg-gradient-to-tr from-green-400 to-emerald-500",
    },
    {
      title: "Total Views (Profiles & Categories)",
      value: metrics.totalViews,
      description: "Combined total profile and category views",
      icon: <EyeIcon className="text-white w-4 h-4" />,
      iconBg: "bg-gradient-to-tr from-red-400 to-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
      {metricsData.map((metric, index) => (
        <div
          key={index}
          className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-4 shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          {/* Icon */}
          <div
            className={`flex items-center justify-center w-9 h-9 rounded-xl ${metric.iconBg}`}
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
                {typeof metric.value === 'number' 
                  ? metric.value.toLocaleString() 
                  : metric.value}
              </h4>
            </div>
          </div>

          {/* Description */}
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {metric.description}
          </p>
        </div>
      ))}
    </div>
  );
};
