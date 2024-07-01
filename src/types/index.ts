import {
  ButtonProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
  PaginationProps,
  TableProps,
} from "@nextui-org/react";
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
  startContant?: () => JSX.Element | React.ReactNode;
  endContant?: () => JSX.Element | React.ReactNode;
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
  tableData?: CMTableData;
  actions?: CMTableActions;
  paginationProps?: Partial<PaginationProps>;
  searchPlaceholder?: string;
  isFilterable?: boolean;
  filterContent?: React.FC<{
    data: CMTableDataItem[];
    onDataFilter: (filteredData: CMTableDataItem[]) => void;
  }>;
  showTotalCount?: boolean;
  showRowsPerPageSelector?: boolean;
  showSelectedCount?: boolean;
  rowPerPage?: number;
  pageSizeInterval?: number;
  bulkActionContent?: (data: CMTableDataItem[]) => ReactNode;
  onBulkDelete?: (data: CMTableDataItem[]) => void;
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
  success: (text: string | any) => void;
  error: (text: string | any) => void;
  warning: (text: string | any) => void;
  info: (text: string | any) => void;
}

export interface ModalOptions {
  body: ReactNode;
  modalBodyProps?: Partial<ModalBodyProps>;
  header?: ReactNode;
  modalHeaderProps?: Partial<ModalHeaderProps>;
  footer?: ReactNode;
  modalFooterProps?: Partial<ModalFooterProps>;
  modalProps?: Partial<ModalProps>;
  showSaveButton?: boolean;
  saveButtonText?: string;
  saveButtonProps?: ButtonProps;
  onSave?: () => void;
  onClose?: () => void;
  showCloseButton?: boolean;
  closButtonProps?: ButtonProps;
  hideBottomCloseButton?: boolean;
  isDismissable?: boolean;
}

export interface ModalContextType {
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}

export interface ConfirmationCardProps {
  icon?: React.JSX.Element | React.FC<IconSvgProps>;
  title?: string | null;
  description?: string | null;
}
