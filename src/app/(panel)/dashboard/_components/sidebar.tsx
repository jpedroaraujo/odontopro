"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Banknote,
  CalendarCheck2,
  ChevronLeft,
  ChevronRight,
  Folder,
  List,
  Settings,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/../public/logo-odonto.png";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SidebarDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <aside
        className={clsx(
          "flex flex-col border-rs bg-background transition-all duration-300 p-4 h-full",
          {
            "w-20": isCollapsed,
            "w-64": !isCollapsed,
            "hidden md:flex md:fixed": true,
          },
        )}
      >
        <div className="mb-6 mt-4 flex flex-col items-center justify-center">
          {!isCollapsed && (
            <Image
              src={logoImg}
              alt="Logo do OdontoPRO"
              quality={100}
              priority
            />
          )}

          <Button
            className={clsx(
              "bg-gray-100 hover:bg-gray-50 text-zinc-900 self-end mb-2",
              { "rotate-180 w-full": isCollapsed, "w-fit": !isCollapsed },
            )}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {isCollapsed && (
            <nav className="flex flex-col gap-1 overflow-hidden mt-2">
              <Tooltip>
                <TooltipTrigger>
                  <SidebarLink
                    href="/dashboard"
                    label="Agendamentos"
                    icon={<CalendarCheck2 className="w-6 h-6" />}
                    isCollapsed={isCollapsed}
                    pathname={pathname}
                  />
                </TooltipTrigger>

                <TooltipContent side="right">
                  <span>Agendamentos</span>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <SidebarLink
                    href="/dashboard/services"
                    label="Serviços"
                    icon={<Folder className="w-6 h-6" />}
                    isCollapsed={isCollapsed}
                    pathname={pathname}
                  />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <span>Serviços</span>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <SidebarLink
                    href="/dashboard/profile"
                    label="Meu Perfil"
                    icon={<Settings className="w-6 h-6" />}
                    isCollapsed={isCollapsed}
                    pathname={pathname}
                  />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <span>Meu Perfil</span>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <SidebarLink
                    href="/dashboard/plans"
                    label="Planos"
                    icon={<Banknote className="w-6 h-6" />}
                    isCollapsed={isCollapsed}
                    pathname={pathname}
                  />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <span>Planos</span>
                </TooltipContent>
              </Tooltip>
            </nav>
          )}

          <Collapsible open={!isCollapsed}>
            <CollapsibleContent>
              <nav className="flex flex-col gap-1 overflow-hidden">
                <span className="text-sm text-gray-400 font-medium mt-1 uppercase">
                  Painel
                </span>
                <SidebarLink
                  href="/dashboard"
                  label="Agendamentos"
                  icon={<CalendarCheck2 className="w-6 h-6" />}
                  isCollapsed={isCollapsed}
                  pathname={pathname}
                />

                <SidebarLink
                  href="/dashboard/services"
                  label="Serviços"
                  icon={<Folder className="w-6 h-6" />}
                  isCollapsed={isCollapsed}
                  pathname={pathname}
                />

                <span className="text-sm text-gray-400 font-medium mt-1 uppercase">
                  Minha Conta
                </span>
                <SidebarLink
                  href="/dashboard/profile"
                  label="Meu Perfil"
                  icon={<Settings className="w-6 h-6" />}
                  isCollapsed={isCollapsed}
                  pathname={pathname}
                />

                <SidebarLink
                  href="/dashboard/plans"
                  label="Planos"
                  icon={<Banknote className="w-6 h-6" />}
                  isCollapsed={isCollapsed}
                  pathname={pathname}
                />
              </nav>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </aside>

      <div
        className={clsx("flex flex-1 flex-col transition-all duration-300", {
          "md:ml-20": isCollapsed,
          "md:ml-64": !isCollapsed,
        })}
      >
        <header className="md:hidden flex items-center justify-between px-2 md:px-6 h-14 z-10 border-b sticky top-0 bg-white">
          <Sheet>
            <div className="flex items-center gap-4">
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsCollapsed(false)}
                >
                  <List className="w-5 h-5" />
                </Button>
              </SheetTrigger>

              <h1 className="text-base md:text-lg font-semibold">
                Menu OdontoPRO
              </h1>
            </div>

            <SheetContent side="right" className="sm:max-w-xs text-black">
              <SheetHeader>
                <SheetTitle>OdontoPRO</SheetTitle>
                <SheetDescription>Menu administrativo</SheetDescription>
              </SheetHeader>

              <nav className="grid gap-2 text-base pt-5 px-4">
                <SidebarLink
                  href="/dashboard"
                  label="Agendamentos"
                  icon={<CalendarCheck2 className="w-6 h-6" />}
                  isCollapsed={isCollapsed}
                  pathname={pathname}
                />

                <SidebarLink
                  href="/dashboard/services"
                  label="Serviços"
                  icon={<Folder className="w-6 h-6" />}
                  isCollapsed={isCollapsed}
                  pathname={pathname}
                />

                <SidebarLink
                  href="/dashboard/profile"
                  label="Meu Perfil"
                  icon={<Settings className="w-6 h-6" />}
                  isCollapsed={isCollapsed}
                  pathname={pathname}
                />

                <SidebarLink
                  href="/dashboard/plans"
                  label="Planos"
                  icon={<Banknote className="w-6 h-6" />}
                  isCollapsed={isCollapsed}
                  pathname={pathname}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 py-4 px-2 md:p-6">{children}</main>
      </div>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  isCollapsed: boolean;
  pathname: string;
}

function SidebarLink({
  href,
  label,
  icon,
  isCollapsed,
  pathname,
}: SidebarLinkProps) {
  return (
    <Link href={href}>
      <div
        className={clsx(
          "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
          {
            "bg-blue-500 text-white": pathname === href,
            "text-gray-700 hover:bg-gray-100": pathname !== href,
          },
        )}
      >
        <span className="w-6 h-6">{icon}</span>
        {!isCollapsed && <span>{label}</span>}
      </div>
    </Link>
  );
}
