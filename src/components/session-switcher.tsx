import { Chip, Tooltip, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { useModal } from "@/providers/modal-context";

const sessions = [
  "2019-20",
  "2020-21",
  "2021-22",
  "2022-23",
  "2023-24",
  "2024-25",
];

const SessionSwitcher = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { openModal } = useModal();

  const handleModal = () => {
    openModal({
      header: "Change Session",
      body: (
        <div>
          <Select defaultSelectedKeys={["2024-25"]} label="Session">
            {sessions.map((session) => (
              <SelectItem key={session}>{session}</SelectItem>
            ))}
          </Select>
        </div>
      ),
      showSaveButton: true,
      modalProps: {
        isDismissable: false,
      },
    });
  };

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  // Prevent Hydration Mismatch
  if (!isMounted) return <div className="w-6 h-6" />;

  return (
    <>
      <div className="flex items-center justify-center">
        <p className="text-small truncate px-2 py-1 font-normal">
          Current Session :
        </p>
        <Tooltip
          closeDelay={0}
          color="default"
          content={
            <div>
              <h1 className="font-bold">Current Session: 2024-25</h1>
              <p>Click to change the current session.</p>
            </div>
          }
        >
          <Chip
            className="cursor-pointer"
            color="primary"
            size="sm"
            title="Change Session"
            onClick={handleModal}
          >
            2024-25
          </Chip>
        </Tooltip>
      </div>
    </>
  );
};

export default SessionSwitcher;
