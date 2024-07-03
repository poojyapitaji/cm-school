import { Tabs, Tab, Button } from "@nextui-org/react";

import { useFrontOfficeStore } from "../store/front-office.store";
import ViewOrEditFOSetting from "../components/modals/view-or-edit-fo-settings";

import CMTable from "@/components/table";
import { Header } from "@/components/header";
import { CMTableActions } from "@/types";
import { convertToTitleCase } from "@/utils";
import { Plus } from "@/components/icons";

export interface SetupFrontOfficeProps {
  title: string;
  key: string;
}

const SetupFrontOffice = () => {
  const frontOfficeStore = useFrontOfficeStore();

  const options: SetupFrontOfficeProps[] = [
    { title: "Source", key: "source" },
    { title: "Purpose", key: "purpose" },
    { title: "Reference", key: "reference" },
    { title: "Complain Type", key: "complain-type" },
  ];

  const handleSave = () => {
    frontOfficeStore._modal.closeModal();
  };

  const handleModal = (data: any, isReadOnly = false) => {
    frontOfficeStore._modal.openModal({
      header: `${isReadOnly ? "View" : "Edit"} ${convertToTitleCase(
        data.type
      )}`,
      body: <ViewOrEditFOSetting data={data} isReadOnly={isReadOnly} />,
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
      callback: (data) => frontOfficeStore.confirmDelete(data),
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <div className="mb-3">
        <Header
          description="Here you can setup your font office required fields like source, purpose, reference and complain type."
          endContant={() => (
            <Button
              className="mt-1"
              color="primary"
              startContent={<Plus size={20} />}
            >
              Add
            </Button>
          )}
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
              tableData={[
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
                {
                  key: "6",
                  type: option.key,
                  [option.key]: "Product D",
                  description:
                    "Product D is known for its versatility and robustness.",
                },
                {
                  key: "7",
                  type: option.key,
                  [option.key]: "Service Z",
                  description:
                    "Service Z ensures seamless integration with your existing systems.",
                },
                {
                  key: "8",
                  type: option.key,
                  [option.key]: "Product E",
                  description:
                    "Product E helps businesses achieve operational excellence.",
                },
                {
                  key: "9",
                  type: option.key,
                  [option.key]: "Service W",
                  description:
                    "Service W delivers innovative solutions for scalable growth.",
                },
                {
                  key: "10",
                  type: option.key,
                  [option.key]: "Product F",
                  description:
                    "Product F empowers users with advanced features and usability.",
                },
                {
                  key: "11",
                  type: option.key,
                  [option.key]: "Service V",
                  description:
                    "Service V offers strategic insights for informed decision-making.",
                },
                {
                  key: "12",
                  type: option.key,
                  [option.key]: "Product G",
                  description:
                    "Product G enhances productivity through streamlined processes.",
                },
                {
                  key: "13",
                  type: option.key,
                  [option.key]: "Service U",
                  description:
                    "Service U provides personalized solutions for enhanced user experience.",
                },
                {
                  key: "14",
                  type: option.key,
                  [option.key]: "Product H",
                  description:
                    "Product H is tailored for maximum efficiency and reliability.",
                },
                {
                  key: "15",
                  type: option.key,
                  [option.key]: "Service T",
                  description:
                    "Service T integrates seamlessly with your business operations.",
                },
                {
                  key: "16",
                  type: option.key,
                  [option.key]: "Product I",
                  description:
                    "Product I revolutionizes the way businesses manage their data.",
                },
                {
                  key: "17",
                  type: option.key,
                  [option.key]: "Service S",
                  description:
                    "Service S offers cutting-edge solutions for industry challenges.",
                },
                {
                  key: "18",
                  type: option.key,
                  [option.key]: "Product J",
                  description:
                    "Product J enables businesses to achieve operational excellence.",
                },
                {
                  key: "19",
                  type: option.key,
                  [option.key]: "Service R",
                  description:
                    "Service R delivers scalable solutions tailored to your business needs.",
                },
                {
                  key: "20",
                  type: option.key,
                  [option.key]: "Product K",
                  description:
                    "Product K empowers organizations with advanced technology solutions.",
                },
                {
                  key: "21",
                  type: option.key,
                  [option.key]: "Service Q",
                  description:
                    "Service Q enhances user experience through innovative solutions.",
                },
                {
                  key: "22",
                  type: option.key,
                  [option.key]: "Product L",
                  description:
                    "Product L is designed to optimize business processes.",
                },
                {
                  key: "23",
                  type: option.key,
                  [option.key]: "Service P",
                  description:
                    "Service P provides robust solutions for enhanced productivity.",
                },
                {
                  key: "24",
                  type: option.key,
                  [option.key]: "Product M",
                  description:
                    "Product M offers comprehensive features for business success.",
                },
                {
                  key: "25",
                  type: option.key,
                  [option.key]: "Service O",
                  description:
                    "Service O ensures seamless integration and performance.",
                },
                {
                  key: "26",
                  type: option.key,
                  [option.key]: "Product N",
                  description:
                    "Product N is known for its reliability and scalability.",
                },
                {
                  key: "27",
                  type: option.key,
                  [option.key]: "Service N",
                  description:
                    "Service N delivers tailored solutions for sustainable growth.",
                },
                {
                  key: "28",
                  type: option.key,
                  [option.key]: "Product O",
                  description:
                    "Product O enhances operational efficiency and effectiveness.",
                },
                {
                  key: "29",
                  type: option.key,
                  [option.key]: "Service M",
                  description:
                    "Service M offers strategic insights and innovative solutions.",
                },
                {
                  key: "30",
                  type: option.key,
                  [option.key]: "Product P",
                  description:
                    "Product P empowers organizations with advanced technology solutions.",
                },
                {
                  key: "31",
                  type: option.key,
                  [option.key]: "Service L",
                  description:
                    "Service L delivers scalable solutions tailored to your business needs.",
                },
                {
                  key: "32",
                  type: option.key,
                  [option.key]: "Product Q",
                  description:
                    "Product Q enhances user experience through innovative solutions.",
                },
                {
                  key: "33",
                  type: option.key,
                  [option.key]: "Service K",
                  description:
                    "Service K is designed to optimize business processes.",
                },
                {
                  key: "34",
                  type: option.key,
                  [option.key]: "Product R",
                  description:
                    "Product R provides robust solutions for enhanced productivity.",
                },
                {
                  key: "35",
                  type: option.key,
                  [option.key]: "Service J",
                  description:
                    "Service J offers comprehensive features for business success.",
                },
                {
                  key: "36",
                  type: option.key,
                  [option.key]: "Product S",
                  description:
                    "Product S ensures seamless integration and performance.",
                },
                {
                  key: "37",
                  type: option.key,
                  [option.key]: "Service I",
                  description:
                    "Service I is known for its reliability and scalability.",
                },
                {
                  key: "38",
                  type: option.key,
                  [option.key]: "Product T",
                  description:
                    "Product T delivers tailored solutions for sustainable growth.",
                },
                {
                  key: "39",
                  type: option.key,
                  [option.key]: "Service H",
                  description:
                    "Service H enhances operational efficiency and effectiveness.",
                },
                {
                  key: "40",
                  type: option.key,
                  [option.key]: "Product U",
                  description:
                    "Product U offers strategic insights and innovative solutions.",
                },
              ]}
              onBulkDelete={(data) => frontOfficeStore.confirmDelete(data)}
              // onBulkDelete={(data) => console.log(data)}
            />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default SetupFrontOffice;
