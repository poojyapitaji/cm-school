import { Accordion, AccordionItem, Link } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import SessionSwitcher from "./session-switcher";
import SearchInput from "./search-input";

import { isValidElementType } from "@/utils";
import { SidebarMenuProps } from "@/types";

const itemClasses = {
  base: "py-0 w-full",
  title: "font-normal text-small",
  trigger:
    "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-10 flex items-center",
  indicator: "text-small",
  content: "text-small px-2",
};

export const Sidebar: React.FC<{ menus: SidebarMenuProps[] }> = ({ menus }) => {
  const { pathname } = useLocation();

  const [expandedKeys, setExpandedKeys] = useState<Array<string>>([]);

  const isActive = (href: string | undefined) => {
    if (!href) return false;

    return pathname === href;
  };

  useEffect(() => {
    if (Boolean(menus.length)) {
      const defaultActiveKey = menus.find((menu) => {
        return pathname.startsWith(`/${menu.slug}`);
      });

      if (defaultActiveKey) {
        setExpandedKeys([defaultActiveKey.key.toString()]);
      } else {
        setExpandedKeys([]);
      }
    }
  }, [pathname, menus]);

  const handleSelectionChange = (key: string | Set<string>) => {
    if (typeof key === "string") {
      setExpandedKeys([key]);
    } else {
      setExpandedKeys(Array.from(key));
    }
  };

  return (
    <section className="py-2 w-[300px] shadow fixed overflow-y-auto mt-[4rem] h-[calc(100%-4rem)] top-0 left-0">
      <div className="sm:hidden flex flex-col py-3 px-2 gap-3">
        <SessionSwitcher />
        <SearchInput />
      </div>
      <Accordion
        className="flex flex-col"
        itemClasses={itemClasses}
        selectedKeys={expandedKeys}
        showDivider={false}
        onSelectionChange={(key) => handleSelectionChange(key as string)}
      >
        {menus.map((menu) => (
          <AccordionItem
            key={menu.key}
            aria-label={menu.title}
            startContent={
              isValidElementType(menu.icon)
                ? React.createElement(menu.icon, { size: 20 })
                : null
            }
            title={menu.title}
          >
            {menu.menus.map((m) => (
              <Link
                key={m.href} // Using href as the key is more stable
                className={`flex justify-start items-center gap-1 ${
                  isActive(m.href) ? "bg-primary shadow rounded" : ""
                }`}
                color="foreground"
                href={m.href}
              >
                <p
                  className={`text-small truncate px-2 py-1 font-normal text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 w-full hover:rounded-md ${
                    isActive(m.href) ? "text-white" : ""
                  }`}
                >
                  {m.label}
                </p>
              </Link>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
