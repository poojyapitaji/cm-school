import { ElementType, LazyExoticComponent, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type MenuProps = {
  key: number;
  icon?: React.ReactNode | ElementType;
  title: string;
  slug: string;
  menus: {
    href: string;
    label: string;
    element: LazyExoticComponent<React.ComponentType<any>> | React.ReactNode;
  }[];
};

export type Modules = {
  init: {
    placement: number;
    name: string;
    index: string;
  };
  metaData?: {
    title: string;
    description: string;
  };
  navigation?: MenuProps[];
};
