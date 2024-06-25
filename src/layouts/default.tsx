import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { MenuProps } from "@/types";

interface DefaultLayoutProps {
  menus: MenuProps[];
  children: React.ReactNode;
}

export default function DefaultLayout({ menus, children }: DefaultLayoutProps) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <div className="flex h-full">
        <Sidebar menus={menus} />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
