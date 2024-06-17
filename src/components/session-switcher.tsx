import {
  Chip,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            onClick={onOpen}
          >
            2024-25
          </Chip>
        </Tooltip>
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Change Session
              </ModalHeader>
              <ModalBody>
                <div>
                  <Select defaultSelectedKeys={["2024-25"]} label="Session">
                    {sessions.map((session) => (
                      <SelectItem key={session}>{session}</SelectItem>
                    ))}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SessionSwitcher;
