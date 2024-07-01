import React from "react";

import { CMFile } from "@/types";

export interface FrontOfficeStoreProviderProps {
  children: React.ReactNode;
}

export interface FOSetting {
  title?: string;
  description?: string;
}

export interface FOSettings {
  purpose?: FOSetting[];
  complaintType?: FOSetting[];
  source?: FOSetting[];
  reference?: FOSetting[];
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

export interface ViewOrEditSettingData extends FOSetting {
  key?: string;
  type?: string;
  [key: string]: any;
}

export interface ViewOrEditSettingsProps {
  data?: ViewOrEditSettingData;
  isReadOnly?: boolean;
}
