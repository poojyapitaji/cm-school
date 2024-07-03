import React, { useState } from "react";
import _ from "lodash";

import {
  FOAdmissionEnquiry,
  FOComplain,
  FOPhoneCallLog,
  FOPostalDispatch,
  FOPostalReceive,
  FOSetting,
  FOSettings,
  FOVisitorBook,
  FrontOfficeStoreProviderProps,
  ViewOrEditSettingData,
} from "../types";
import FrontOfficeService from "../services/front-office-settings.store";

import { LoaderContextType, ModalContextType, ToastContextType } from "@/types";
import { useToast } from "@/providers/toast-context";
import { useModal } from "@/providers/modal-context";
import ConfirmationCard from "@/components/confirmation-card";
import { useLoader } from "@/providers/loader-context";

class FrontOfficeStore {
  _settings: FOSettings[] = [];
  _admissionEnquiries: FOAdmissionEnquiry[] = [];
  _visitorBooks: FOVisitorBook[] = [];
  _phoneCallLogs: FOPhoneCallLog[] = [];
  _postalOperations: (FOPostalDispatch | FOPostalReceive)[] = [];
  _complaints: FOComplain[] = [];
  _loader: LoaderContextType;
  _toast: ToastContextType;
  _modal: ModalContextType;
  _foService: FrontOfficeService;
  _deepCopy: FrontOfficeStore | null = null;

  constructor(
    loader: LoaderContextType,
    toast: ToastContextType,
    modal: ModalContextType,
    foService: FrontOfficeService
  ) {
    this._loader = loader;
    this._toast = toast;
    this._modal = modal;
    this._foService = foService;
    this.init();
  }

  init() {
    this._deepCopy = _.cloneDeep(this);
  }

  addFOSettings(_data: FOSetting, _type: string) {
    // make call to service to add FO settings to the server
  }

  updateFOSettings(_data: FOSetting, _type: string) {
    // make call to service to update FO settings to the server
  }

  confirmDelete(data: ViewOrEditSettingData) {
    this._modal.openModal({
      body: (
        <ConfirmationCard
          description={
            Boolean(data.length > 0)
              ? `Are yo sure to delete ${data.length} items?`
              : "Are you sure you want to delete this item?"
          }
        />
      ),
      showSaveButton: true,
      saveButtonText: "Delete",
      showCloseButton: false,
      modalProps: {
        size: "sm",
        isDismissable: false,
      },
      modalFooterProps: {
        className: "justify-center",
      },
      saveButtonProps: {
        className: "flex-1",
        color: "danger",
      },
      closButtonProps: {
        className: "flex-1",
        color: "default",
      },
      onSave: () => {
        this.deleteFOSettings(data);
        this._modal.closeModal();
      },
    });
  }

  deleteFOSettings(data: ViewOrEditSettingData) {
    this._loader.show();
    setTimeout(() => {
      this._loader.hide();
      this._toast.success(`Deleted successfully ${JSON.stringify(data)}`);
    }, 3000);
  }
}

export const FrontOfficeStoreContext = React.createContext<FrontOfficeStore>(
  null!
);

export const useFrontOfficeStore = () => {
  let context = React.useContext(FrontOfficeStoreContext);

  if (!context) {
    throw new Error(
      "useFrontOfficeStoreContext must be used within a FrontOfficeStoreProvider"
    );
  }

  return context;
};

const useFrontOfficeStoreInitialize = () => {
  const loader = useLoader();
  const toast = useToast();
  const modal = useModal();
  const foService = new FrontOfficeService();

  const [store] = useState<FrontOfficeStore>(
    () => new FrontOfficeStore(loader, toast, modal, foService)
  );

  return store;
};

const FrontOfficeStoreProvider: React.FC<FrontOfficeStoreProviderProps> = ({
  children,
}) => {
  const store = useFrontOfficeStoreInitialize();

  if (!store) return null;

  return (
    <FrontOfficeStoreContext.Provider value={store}>
      {children}
    </FrontOfficeStoreContext.Provider>
  );
};

export default FrontOfficeStoreProvider;
