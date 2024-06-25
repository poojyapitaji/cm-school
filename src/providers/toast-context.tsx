import React, { createContext, useContext, useEffect, useState } from "react";
import PubSub from "nano-pubsub";
import { createPortal } from "react-dom";

import Toast from "@/components/toast";
import { ToastContextType, ToastMessage, ToastProviderProps } from "@/types";

const ToastContext = createContext<ToastContextType | undefined>(undefined);
const toastPubSub = PubSub<ToastMessage>();
let toastId = 0;

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const unsubscribe = toastPubSub.subscribe((message) => {
      const newToastId = ++toastId;

      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, id: newToastId },
      ]);

      setTimeout(() => {
        setMessages((prevMessages) =>
          prevMessages.filter((m) => m.id !== newToastId)
        );
      }, 5000);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const publish = (message: Omit<ToastMessage, "id">) => {
    toastPubSub.publish({ ...message, id: ++toastId });
  };

  const success = (text: string) => publish({ text, type: "success" });
  const error = (text: string) => publish({ text, type: "error" });
  const warning = (text: string) => publish({ text, type: "warning" });
  const info = (text: string) => publish({ text, type: "info" });

  const toastContextValue: ToastContextType = {
    publish,
    success,
    error,
    warning,
    info,
  };

  const removeToast = (id: number) => {
    setMessages((prevMessages) => prevMessages.filter((m) => m.id !== id));
  };

  return (
    <ToastContext.Provider value={toastContextValue}>
      {children}
      {createPortal(
        <Toast messages={messages} removeToast={removeToast} />,
        document.body
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
