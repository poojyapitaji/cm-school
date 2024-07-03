import {
  Button,
  Card,
  DatePicker,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { Header } from "@/components/header";
import CMTable from "@/components/table";
import { CMTableColumns } from "@/types";

const columns: CMTableColumns = [
  { name: "Name", uid: "name", sortable: true },
  { name: "Phone", uid: "phone", sortable: true },
  { name: "Source", uid: "source", sortable: true },
  { name: "Enquiry Date", uid: "enquiryDate", sortable: true },
  { name: "Last Follow Up Date", uid: "lastFollowUpDate", sortable: true },
  { name: "Next Follow Up Date", uid: "nextFollowUpDate", sortable: true },
  { name: "Status", uid: "status", sortable: true },
];

const AdmissionEnquiry = () => {
  const filters = () => {
    return (
      <Card
        className="flex flex-col gap-2 border dark:border-gray-800 p-3 mb-6 "
        shadow="none"
      >
        <h1>Select Criteria</h1>
        <div className="flex justify-evenly items-center gap-3">
          <Select label="Source" size="sm">
            <SelectItem key="1">Office</SelectItem>
            <SelectItem key="2">Online</SelectItem>
            <SelectItem key="3">Ad</SelectItem>
          </Select>
          <DatePicker label="Enquiry From Date" size="sm" />
          <DatePicker label="Enquiry To Date" size="sm" />
          <Select label="Status" size="sm">
            <SelectItem key="1">Active</SelectItem>
            <SelectItem key="2">Passive</SelectItem>
            <SelectItem key="3">Dead</SelectItem>
            <SelectItem key="4">Won</SelectItem>
          </Select>
        </div>
        <Button className="w-32 self-end mt-2" color="primary">
          Apply
        </Button>
      </Card>
    );
  };

  return (
    <div>
      <Header
        description="Add a new or find admission enquries here."
        title="Admission Enquiry"
      />
      <Card className="mt-3" shadow="sm">
        <CMTable
          isFilterable
          className="overflow-x-auto"
          columns={columns}
          filterContent={filters}
        />
      </Card>
    </div>
  );
};

export default AdmissionEnquiry;
