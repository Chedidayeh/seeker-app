import { Metadata } from "next";
import React from "react";
import ComponentCard from "../../../../components/adminDashboard/ComponentCard";
import BasicTableOne from "../../../../components/adminDashboard/BasicTableOne";
import PageBreadcrumb from "../../../../components/adminDashboard/PageBreadCrumb";

export const metadata: Metadata = {
    title: "Next.js Basic Table | TailAdmin - Next.js Dashboard Template",
    description:
        "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
    // other metadata
};

export default function Insights() {
    return (
        <div className="flex flex-col gap-8">
            <h2
                className="text-3xl font-semibold text-gray-800 dark:text-white/90"
                x-text="pageName"
            >
                Insights
            </h2>
            <div className="space-y-6">
                <ComponentCard title="Basic Table 1">
                    <BasicTableOne />
                </ComponentCard>
            </div>
        </div>
    );
}
