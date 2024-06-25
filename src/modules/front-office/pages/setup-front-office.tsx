import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
} from "@nextui-org/react";

import CMTable from "@/components/table";
import { Header } from "@/components/header";
import { CMTableActions } from "@/types";
import { useModal } from "@/providers/modal-context";
import { convertToTitleCase } from "@/utils";
import { Delete, Plus } from "@/components/icons";

export interface SetupFrontOfficeProps {
  title: string;
  key: string;
}

const SetupFrontOffice = () => {
  const { openModal, closeModal } = useModal();

  const options: SetupFrontOfficeProps[] = [
    { title: "Source", key: "source" },
    { title: "Purpose", key: "purpose" },
    { title: "Reference", key: "reference" },
    { title: "Complain Type", key: "complain-type" },
  ];

  const handleSave = () => {
    closeModal();
  };

  const handleDelete = (data: any) => {
    openModal({
      body: (
        <div className="flex flex-col w-full justify-center items-center gap-2 pt-4">
          <Delete
            className="text-danger animate-wiggle animate-thrice animate-duration-[110ms] animate-ease-in-out animate-delay-300"
            size={60}
          />
          <h1 className="text-xl font-bold">Confirm Delete</h1>
          <p className="text-md text-gray-500 text-center">
            Are you sure you want to delete this item?
          </p>
        </div>
      ),
      footer: (
        <div className="flex w-full gap-3">
          <Button className="flex-1" color="danger" onPress={closeModal}>
            Delete
          </Button>
          <Button className="flex-1" variant="light" onPress={closeModal}>
            Cancel
          </Button>
        </div>
      ),
      modalProps: {
        size: "sm",
      },
    });
  };

  const renderModalBody = (data: any, isReadOnly = false) => {
    return (
      <Card className="w-full p-0" shadow="none">
        <CardBody className="flex gap-3 p-0">
          <Input
            defaultValue={data[data.type]}
            isClearable={!isReadOnly}
            isRequired={!isReadOnly}
            label={`${convertToTitleCase(data.type)}`}
            placeholder={`Enter ${data.type.toLowerCase()}`}
            readOnly={isReadOnly}
          />
          <Textarea
            defaultValue={data.description}
            label={"Description"}
            placeholder="Enter description here"
            readOnly={isReadOnly}
          />
        </CardBody>
      </Card>
    );
  };

  const handleModal = (data: any, isReadOnly = false) => {
    openModal({
      header: `${isReadOnly ? "View" : "Edit"} ${convertToTitleCase(
        data.type
      )}`,
      body: renderModalBody(data, isReadOnly),
      onSave: handleSave,
      showSaveButton: !isReadOnly,
      showCloseButton: isReadOnly,
      hideBottomCloseButton: isReadOnly,
      modalProps: {
        isDismissable: isReadOnly,
      },
    });
  };

  const actions: CMTableActions = [
    {
      type: "VIEW",
      callback: (data) => handleModal(data, true),
    },
    {
      type: "EDIT",
      callback: (data) => handleModal(data, false),
    },
    {
      type: "DELETE",
      callback: (data) => handleDelete(data),
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <div className="mb-3">
        <Header
          description="Here you can setup your font office required fields like source, purpose, reference and complain type."
          title="Setup Front Office"
        />
      </div>
      <Tabs aria-label="Options" className="w-full">
        {options.map((option) => (
          <Tab key={option.key} title={option.title}>
            <CMTable
              actions={actions}
              columns={[
                { name: option.title, uid: option.key, sortable: true },
                { name: "Description", uid: "description", sortable: true },
              ]}
              data={[
                {
                  key: "1",
                  type: option.key,
                  [option.key]: "Product A",
                  description: "This is Product A, which does X and Y.",
                },
                {
                  key: "2",
                  type: option.key,
                  [option.key]: "Product B",
                  description:
                    "Product B is designed for efficiency and speed.",
                },
                {
                  key: "3",
                  type: option.key,
                  [option.key]: "Product C",
                  description:
                    "Explore the features of Product C for your business needs.",
                },
                {
                  key: "4",
                  type: option.key,
                  [option.key]: "Service X",
                  description:
                    "Service X provides comprehensive solutions for industry challenges.",
                },
                {
                  key: "5",
                  type: option.key,
                  [option.key]: "Service Y",
                  description:
                    "Service Y offers tailored solutions to enhance productivity.",
                },
              ]}
            />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default SetupFrontOffice;
