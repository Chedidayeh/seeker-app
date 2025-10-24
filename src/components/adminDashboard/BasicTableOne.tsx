import React from "react";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Category {
  id: number;
  name: string;
  icon: string;
  totalServices: number;
  status: string;
}

// Define the table data using the interface
const tableData: Category[] = [
  {
    id: 1,
    name: "Home Cleaning",
    icon: "🧹",
    totalServices: 45,
    status: "Active",
  },
  {
    id: 2,
    name: "Plumbing",
    icon: "🔧",
    totalServices: 32,
    status: "Active",
  },
  {
    id: 3,
    name: "Electrical",
    icon: "⚡",
    totalServices: 28,
    status: "Active",
  },
  {
    id: 4,
    name: "Carpentry",
    icon: "🪚",
    totalServices: 15,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Painting",
    icon: "🎨",
    totalServices: 22,
    status: "Active",
  },
];

export default function BasicTableOne() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[800px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Category
                </TableCell>
                <TableCell
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Total Services
                </TableCell>
                <TableCell
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="px-5 py-4 text-start">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {category.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {category.totalServices}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    <Badge
                      color={category.status === "Active" ? "success" : "error"}
                    >
                      {category.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
