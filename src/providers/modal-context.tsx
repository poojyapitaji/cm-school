import React, { createContext, useContext, ReactNode, useState } from "react";
import {
  Modal,
  useDisclosure,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalProps,
} from "@nextui-org/react";

import { ModalContextType, ModalOptions } from "@/types";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalBody, setModalBody] = useState<ReactNode>(null);
  const [modalHeader, setModalHeader] = useState<ReactNode>(null);
  const [modalFooter, setModalFooter] = useState<ReactNode>(null);
  const [modalProps, setModalProps] = useState<Partial<ModalProps>>();
  const [showSaveButton, setShowSaveButton] = useState<boolean>(false);
  const [saveButtonText, setSaveButtonText] = useState<string>("Save");
  const [onSave, setOnSave] = useState<(() => void) | undefined>(undefined);
  const [onCloseCallback, setOnCloseCallback] = useState<
    (() => void) | undefined
  >(undefined);
  const [showCloseButton, setShowCloseButton] = useState<boolean>(true);
  const [hideBottomCloseButton, setHideBottomCloseButton] =
    useState<boolean>(false);

  const openModal = ({
    body,
    header = null,
    footer = null,
    modalProps = {},
    showSaveButton = false,
    saveButtonText = "Save",
    onSave = undefined,
    onClose = undefined,
    showCloseButton = true,
    hideBottomCloseButton = false,
  }: ModalOptions) => {
    setModalBody(body);
    setModalHeader(header);
    setModalFooter(footer);
    setModalProps((prevProps) => ({
      ...prevProps,
      ...modalProps,
    }));
    setShowSaveButton(showSaveButton);
    setSaveButtonText(saveButtonText);
    setOnSave(() => onSave);
    setOnCloseCallback(() => onClose);
    setShowCloseButton(showCloseButton);
    setHideBottomCloseButton(hideBottomCloseButton);
    onOpen();
  };

  const closeModal = () => {
    onClose();
    if (onCloseCallback) {
      onCloseCallback();
    }
    setModalBody(null);
    setModalHeader(null);
    setModalFooter(null);
    setModalProps({});
    setShowSaveButton(false);
    setSaveButtonText("Save");
    setOnSave(undefined);
    setOnCloseCallback(undefined);
    setShowCloseButton(true);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        {...modalProps}
        hideCloseButton={!showCloseButton}
      >
        <ModalContent>
          {modalHeader && <ModalHeader>{modalHeader}</ModalHeader>}
          <ModalBody>{modalBody}</ModalBody>
          {modalFooter ? (
            <ModalFooter>{modalFooter}</ModalFooter>
          ) : (
            <ModalFooter>
              {!hideBottomCloseButton && (
                <Button color="danger" variant="light" onClick={closeModal}>
                  Close
                </Button>
              )}
              {showSaveButton && (
                <Button color="primary" onClick={onSave || closeModal}>
                  {saveButtonText}
                </Button>
              )}
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
