import React, { useState } from "react";

import { CMFile } from "@/types";
import { ToastContextType, useToast } from "@/providers/toast-context";

interface FrontOfficeStoreProviderProps {
  children: React.ReactNode;
}

export interface FOSetting {
  title: string;
  description?: string;
}

export interface FOSettings {
  purpose: FOSetting[];
  complaintType: FOSetting[];
  source: FOSetting[];
  reference: FOSetting[];
}

export type FOAdmissionEnquiryFollowUpStatus =
  | "Active"
  | "Passive"
  | "Dead"
  | "Won"
  | "Lost";

export interface FOAdmissionEnquiryFollowUp {
  response: string;
  note: string;
  nextFollowUpDate: Date;
}

export interface FOAdmissionEnquiry {
  name: string;
  phone: number;
  email: string;
  address: string;
  description: string;
  note: string;
  date: Date;
  assignedTo: string;
  reference: string;
  source: string;
  class: string;
  numberOfChild: number;
  status: FOAdmissionEnquiryFollowUpStatus;
  followUps: FOAdmissionEnquiryFollowUp[];
}

export interface FOVisitorBook {
  name: string;
  phone: number;
  id: string;
  numberOfPerson: number;
  purpose: string;
  date: Date;
  inTime: string;
  outTime: string;
  note: string;
  documents: CMFile[];
}

export type FOPhoneCallLogCallType = "Incoming" | "Outgoing";

export interface FOPhoneCallLog {
  name: string;
  phont: number;
  date: Date;
  description: string;
  note: string;
  callType: FOPhoneCallLogCallType;
  followUps: FOAdmissionEnquiryFollowUp[];
}

export type FOPostalDispatchReceiveType = "dispatch" | "receive";

export interface FOPostalOperation<T extends string> {
  to: string;
  type: T;
  from: string;
  referenceNumber: string;
  address: string;
  note: string;
  documents: CMFile[];
}

export type FOPostalDispatch = FOPostalOperation<"dispatch">;

export type FOPostalReceive = FOPostalOperation<"receive">;

export type FOComplaintStatus =
  | "Open"
  | "In Progress"
  | "Resolved"
  | "Closed"
  | "Pending"
  | "Escalated"
  | "Rejected";

export interface FOComplain {
  type: string;
  source: string;
  by: string;
  date: Date;
  description: string;
  note: string;
  status: FOComplaintStatus;
  documents: CMFile[];
}

class FrontOfficeStore {
  _settings: FOSettings[] = [];
  _admissionEnquiries: FOAdmissionEnquiry[] = [];
  _visitorBooks: FOVisitorBook[] = [];
  _phoneCallLogs: FOPhoneCallLog[] = [];
  _postalOperations: (FOPostalDispatch | FOPostalReceive)[] = [];
  _complaints: FOComplain[] = [];
  _toast: ToastContextType;

  constructor(toast: ToastContextType) {
    this._toast = toast;
  }
}

export const FrontOfficeStoreContext = React.createContext<FrontOfficeStore>(
  null!
);

export const useFrontOfficeStoreContext = () => {
  let context = React.useContext(FrontOfficeStoreContext);

  if (!context) {
    throw new Error(
      "useFrontOfficeStoreContext must be used within a FrontOfficeStoreProvider"
    );
  }

  return context;
};

const useFrontOfficeStoreInitialize = () => {
  const toast = useToast();

  const [store] = useState<FrontOfficeStore>(() => new FrontOfficeStore(toast));

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
