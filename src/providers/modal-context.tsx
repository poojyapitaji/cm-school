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
  ButtonProps,
  ModalBodyProps,
  ModalHeaderProps,
  ModalFooterProps,
} from "@nextui-org/react";

import { ModalContextType, ModalOptions } from "@/types";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalBody, setModalBody] = useState<ReactNode>(null);
  const [modalBodyProps, setModalBodyProps] =
    useState<Partial<ModalBodyProps>>();
  const [modalHeader, setModalHeader] = useState<ReactNode>(null);
  const [modalHeaderProps, setModalHeaderProps] =
    useState<Partial<ModalHeaderProps>>();
  const [modalFooter, setModalFooter] = useState<ReactNode>(null);
  const [modalFooterProps, setModalFooterProps] =
    useState<Partial<ModalFooterProps>>();
  const [modalProps, setModalProps] = useState<Partial<ModalProps>>();
  const [showSaveButton, setShowSaveButton] = useState<boolean>(false);
  const [saveButtonText, setSaveButtonText] = useState<string>("Save");
  const [saveButtonProps, setSaveButtonProps] =
    useState<Partial<ButtonProps>>();
  const [onSave, setOnSave] = useState<(() => void) | undefined>(undefined);
  const [onCloseCallback, setOnCloseCallback] = useState<
    (() => void) | undefined
  >(undefined);
  const [showCloseButton, setShowCloseButton] = useState<boolean>(true);
  const [closeButtonProps, setCloseButtonProps] =
    useState<Partial<ButtonProps>>();
  const [hideBottomCloseButton, setHideBottomCloseButton] =
    useState<boolean>(false);

  const openModal = ({
    body,
    modalBodyProps = {},
    header = null,
    modalHeaderProps = {},
    footer = null,
    modalFooterProps = {},
    modalProps = {},
    showSaveButton = false,
    saveButtonText = "Save",
    saveButtonProps = {},
    onSave = undefined,
    onClose = undefined,
    showCloseButton = true,
    closButtonProps = {},
    hideBottomCloseButton = false,
  }: ModalOptions) => {
    setModalBody(body);
    setModalBodyProps(modalBodyProps);
    setModalHeader(header);
    setModalHeaderProps(modalHeaderProps);
    setModalFooter(footer);
    setModalFooterProps(modalFooterProps);
    setModalProps((prevProps) => ({
      ...prevProps,
      ...modalProps,
    }));
    setShowSaveButton(showSaveButton);
    setSaveButtonText(saveButtonText);
    setSaveButtonProps(saveButtonProps);
    setOnSave(() => onSave);
    setOnCloseCallback(() => onClose);
    setShowCloseButton(showCloseButton);
    setCloseButtonProps(closButtonProps);
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
          {modalHeader && (
            <ModalHeader {...modalHeaderProps}>{modalHeader}</ModalHeader>
          )}
          <ModalBody {...modalBodyProps}>{modalBody}</ModalBody>
          {modalFooter ? (
            <ModalFooter {...modalFooterProps}>{modalFooter}</ModalFooter>
          ) : (
            <ModalFooter {...modalFooterProps}>
              {showSaveButton && (
                <Button
                  color="primary"
                  onClick={onSave || closeModal}
                  {...saveButtonProps}
                >
                  {saveButtonText}
                </Button>
              )}
              {!hideBottomCloseButton && (
                <Button
                  color="danger"
                  variant="light"
                  onClick={closeModal}
                  {...closeButtonProps}
                >
                  Close
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
