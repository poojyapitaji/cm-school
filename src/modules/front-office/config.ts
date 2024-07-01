import { lazy } from "react";

import FrontOfficeStoreProvider from "./store/front-office.store";

import { BuildingOffice } from "@/components/icons";
import { SidebarMenuProps } from "@/types";

export const init = {
  placement: 1,
  name: "front-office",
  index: "admission-enquiry",
};

export const metaData = {
  title: "Front Office",
  description: "Tools for managing front desk operations and inquiries.",
};

export const navigation: SidebarMenuProps[] = [
  {
    key: init.placement,
    icon: BuildingOffice,
    title: "Front Office",
    slug: init.name,
    globalProviders: [FrontOfficeStoreProvider],
    menus: [
      {
        href: `/${init.name}/admission-enquiry`,
        label: "Admission Enquiry",
        element: lazy(() => import("./pages/admission-enquiry")),
      },
      {
        href: `/${init.name}/visitor-book`,
        label: "Visitor Book",
        element: lazy(() => import("./pages/visitor-book")),
      },
      {
        href: `/${init.name}/phone-call-log`,
        label: "Phone Call Log",
        element: lazy(() => import("./pages/phone-call-log")),
      },
      {
        href: `/${init.name}/postal-dispatch-receive`,
        label: "Postal Dispatch / Receive",
        element: lazy(() => import("./pages/postal-dispatch-receive")),
      },
      {
        href: `/${init.name}/complain`,
        label: "Complain",
        element: lazy(() => import("./pages/complain")),
      },
      {
        href: `/${init.name}/setup-front-office`,
        label: "Setup Front Office",
        element: lazy(() => import("./pages/setup-front-office")),
      },
    ],
  },
];
