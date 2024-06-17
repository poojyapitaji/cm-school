import { Settings } from "@/components/icons";
import { MenuProps } from "@/types";

export const init = {
  placement: 5,
  name: "system-settings",
};

export const metaData = {
  title: "System Settings",
  description: "Tools for managing front desk operations and inquiries.",
};

export const navigation: MenuProps[] = [
  {
    key: init.placement,
    icon: Settings,
    title: "System Settings",
    menus: [
      {
        href: "/",
        label: "General Settings",
      },
    ],
  },
];
