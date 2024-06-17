import { Accordion, AccordionItem, Link } from "@nextui-org/react";
import React from "react";
import { useLocation } from "react-router-dom";

import SessionSwitcher from "./session-switcher";
import SearchInput from "./search-input";

import { isValidElementType } from "@/utils";
import { MenuProps } from "@/types";

const itemClasses = {
  base: "py-0 w-full",
  title: "font-normal text-small",
  trigger:
    "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-10 flex items-center",
  indicator: "text-small",
  content: "text-small px-2",
};

export const Sidebar = ({ menus }: { menus: MenuProps[] }) => {
  const { pathname } = useLocation();

  const isActive = (href: string | undefined) => {
    if (!Boolean(href)) return false;
    if (pathname === href) return true;

    return false;
  };

  return (
    <section className="py-2 w-full max-w-[300px]">
      <div className="sm:hidden flex flex-col py-3 px-2 gap-3">
        <SessionSwitcher />
        <SearchInput />
      </div>
      <Accordion
        className="flex flex-col"
        itemClasses={itemClasses}
        showDivider={false}
      >
        {menus.map((menu) => {
          return (
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
              {menu.menus.map((m, i) => {
                return (
                  <Link
                    key={Date.now() + i}
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
                );
              })}
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
};
