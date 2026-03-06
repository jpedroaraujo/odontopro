import type { Metadata } from "next";
import { SidebarDashboard } from "./_components/sidebar";

export const metadata: Metadata = {
  title: "Nome da página",
  description: "Descrição da página",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarDashboard>{children}</SidebarDashboard>
    </>
  );
}
