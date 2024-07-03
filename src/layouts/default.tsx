import { useLocation } from "react-router-dom";

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { SidebarMenuProps } from "@/types";

interface DefaultLayoutProps {
  menus: SidebarMenuProps[];
  children: React.ReactNode;
}

export default function DefaultLayout({ menus, children }: DefaultLayoutProps) {
  const { pathname } = useLocation();

  if (pathname === "/lock") return children;

  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar menus={menus} />
        <main className="flex-1 p-4 ml-[300px] overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
