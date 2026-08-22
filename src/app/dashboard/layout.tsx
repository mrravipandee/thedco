import React from "react";
import { Metadata } from "next";
import { constructMetadata } from "@/config/seo";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const metadata: Metadata = constructMetadata({
  title: "Admin Dashboard",
  description: "Internal workspace for THEDCO Hospitality Advisory.",
  noIndex: true,
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
