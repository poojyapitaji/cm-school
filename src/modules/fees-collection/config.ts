import { CurrencyRupee } from "@/components/icons";
import { MenuProps } from "@/types";

export const init = {
  placement: 3,
  name: "fees-collection",
};

export const metaData = {
  title: "Fees Collection",
  description:
    "Tools for managing student records, profiles, and academic information.",
};

export const navigation: MenuProps[] = [
  {
    key: init.placement,
    icon: CurrencyRupee,
    title: "Fees Collection",
    menus: [],
    slug: init.name,
  },
];
