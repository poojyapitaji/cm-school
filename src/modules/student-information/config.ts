import { UserPlus } from "@/components/icons";
import { MenuProps } from "@/types";

export const init = {
  placement: 2,
  name: "student-information",
};

export const metaData = {
  title: "Student Information",
  description:
    "Tools for managing student records, profiles, and academic information.",
};

export const navigation: MenuProps[] = [
  {
    key: init.placement,
    icon: UserPlus,
    title: "Student Information",
    menus: [],
  },
];
