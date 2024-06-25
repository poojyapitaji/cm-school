import { ModalProps, PaginationProps, TableProps } from "@nextui-org/react";
import { ElementType, LazyExoticComponent, ReactNode, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ProviderComponent = React.ComponentType<{
  children: React.ReactNode;
}>;

export interface MenuInterface {
  href: string;
  label: string;
  element: LazyExoticComponent<React.ComponentType<any>> | React.ReactNode;
  providers?: ProviderComponent[];
}

export type SidebarMenuProps = {
  key: number;
  icon?: React.ReactNode | ElementType;
  title: string;
  slug: string;
  globalProviders?: ProviderComponent[];
  menus: MenuInterface[];
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
  navigation?: SidebarMenuProps[];
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

export interface RouteObject {
  path: string;
  element: JSX.Element;
}

export interface CustomProviderRouteObject extends RouteObject {
  providers?: ProviderComponent[];
}

export interface HeaderProps {
  title: string;
  description?: string;
}

export interface CMTableColumn {
  uid: string;
  name: string;
  sortable?: boolean;
}

export type CMTableColumns = CMTableColumn[];

export interface CMTableDataItem {
  key: string;
  [key: string]: any;
}

export type CMTableData = CMTableDataItem[];

export type CMTableActionTypes = "VIEW" | "EDIT" | "DELETE";

export interface CMTableAction {
  type: CMTableActionTypes;
  callback: (data: any) => void;
  icon?: React.ReactNode;
}

export type CMTableActions = CMTableAction[];

export interface CMTableProps extends TableProps {
  columns?: CMTableColumns;
  data?: CMTableData;
  actions?: CMTableActions;
  paginationProps?: PaginationProps;
  searchPlaceholder?: string; // default: "Search"
}

export interface ToastProviderProps {
  children: React.ReactNode;
}

export interface ToastMessage {
  id: number;
  text: string;
  type: "success" | "error" | "warning" | "info";
}

export interface ToastContextType {
  publish: (message: Omit<ToastMessage, "id">) => void;
  success: (text: string) => void;
  error: (text: string) => void;
  warning: (text: string) => void;
  info: (text: string) => void;
}

export interface ModalOptions {
  body: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  modalProps?: Partial<ModalProps>;
  showSaveButton?: boolean;
  saveButtonText?: string;
  onSave?: () => void;
  onClose?: () => void;
  showCloseButton?: boolean;
  hideBottomCloseButton?: boolean;
  isDismissable?: boolean;
}

export interface ModalContextType {
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}
