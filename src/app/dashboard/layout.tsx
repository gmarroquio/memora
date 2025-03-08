import type React from "react";
import type { Metadata } from "next";
import DashboardHeader from "@/components/dashboard/dashboard-header";

export const metadata: Metadata = {
  title: {
    default: "Dashboard | Memora",
    template: "%s | Memora Dashboard",
  },
  description: "Manage your event photos and albums",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <DashboardHeader />
      <main className="flex-1 mt-6 flex">{children}</main>
    </div>
  );
}
