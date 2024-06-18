import { BankNotes } from "@/components/icons";
import { MenuProps } from "@/types";

export const init = {
  placement: 4,
  name: "income",
};

export const metaData = {
  title: "Income",
  description: "Tools for managing front desk operations and inquiries.",
};

export const navigation: MenuProps[] = [
  {
    key: init.placement,
    icon: BankNotes,
    title: "Income",
    menus: [],
    slug: init.name,
  },
];
