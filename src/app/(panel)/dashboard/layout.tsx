import type { Metadata } from "next";
import { SidebarDashboard } from "./_components/sidebar";

export const metadata: Metadata = {
  title: "Dashboard - OdontoPRO",
  description:
    "Painel de controle para gerenciamento de pacientes, agendamentos e finanças da clínica odontológica.",
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
