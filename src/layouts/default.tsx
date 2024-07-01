import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { SidebarMenuProps } from "@/types";

interface DefaultLayoutProps {
  menus: SidebarMenuProps[];
  children: React.ReactNode;
}

export default function DefaultLayout({ menus, children }: DefaultLayoutProps) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar menus={menus} />
        <main className="flex-1 p-4 ml-[300px]">{children}</main>
      </div>
    </div>
  );
}
