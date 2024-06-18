import { ElementType, LazyExoticComponent, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ProviderComponent = React.ComponentType<{
  children: React.ReactNode;
}>;

export type MenuProps = {
  key: number;
  icon?: React.ReactNode | ElementType;
  title: string;
  slug: string;
  globalProviders?: ProviderComponent[];
  menus: {
    href: string;
    label: string;
    element: LazyExoticComponent<React.ComponentType<any>> | React.ReactNode;
    providers?: ProviderComponent[];
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

export class CMFile {
  id: string;
  isUploaded: boolean;
  url?: string;
  file: File;

  constructor(id: string, file: File) {
    this.id = id;
    this.isUploaded = false;
    this.url = undefined;
    this.file = file;
  }
}

export interface ProviderWrapperProps {
  providers?: ProviderComponent[];
  children: React.ReactNode;
}

interface RouteObject {
  path: string;
  element: JSX.Element;
}

export interface CustomProviderRouteObject extends RouteObject {
  providers?: ProviderComponent[];
}
