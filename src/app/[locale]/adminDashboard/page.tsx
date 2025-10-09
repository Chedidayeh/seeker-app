import type { Metadata } from "next";
import React from "react";
import { Metrics } from "../../../components/adminDashboard/Metrics";
import ComponentCard from "../../../components/adminDashboard/ComponentCard";
import BasicTableOne from "../../../components/adminDashboard/BasicTableOne";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Ecommerce() {
  return (
    <div className="flex flex-col gap-8">
            <Metrics />
            <ComponentCard title="Basic Table 1">
          <BasicTableOne />
        </ComponentCard>
    </div>
  );
}
