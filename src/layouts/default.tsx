import CommandBar from "@/components/command-bar";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { MenuProps } from "@/types";
import { CommandProvider } from "@/providers/command-context";

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
        <main className="flex-1">
          <CommandProvider>
            <CommandBar />
            {children}
          </CommandProvider>
        </main>
      </div>
    </div>
  );
}
