import React, { createContext, useContext, useEffect, useState } from "react";
import PubSub from "nano-pubsub";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@nextui-org/react";

interface ToastProviderProps {
  children: React.ReactNode;
}

export interface ToastMessage {
  id: number;
  text: string;
  type: "success" | "error" | "warning" | "info";
}

export interface ToastContextType {
  publish: (message: Omit<ToastMessage, "id">) => void;
  success: (text: string) => void;
  error: (text: string) => void;
  warning: (text: string) => void;
  info: (text: string) => void;
}

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

  const getToastClass = (type: ToastMessage["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      case "info":
        return "bg-blue-500";
      default:
        return "";
    }
  };

  const removeToast = (id: number) => {
    setMessages((prevMessages) => prevMessages.filter((m) => m.id !== id));
  };

  const toastVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <ToastContext.Provider value={toastContextValue}>
      {children}
      {createPortal(
        <AnimatePresence>
          <div className="fixed bottom-0 right-0 z-50 pointer-events-auto flex flex-col py-2 px-4 gap-3 w-full sm:w-auto">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                animate="visible"
                className={`relative p-4 rounded-lg shadow-md ${getToastClass(
                  message.type
                )} w-full sm:w-[350px] text-white`}
                exit="hidden"
                initial="hidden"
                transition={{ duration: 0.3 }}
                variants={toastVariants}
              >
                <p className="w-full pr-4">{message.text}</p>
                <Button
                  className="text-white p-1 w-5 h-5 min-w-5 absolute top-2 right-2"
                  size="sm"
                  variant="flat"
                  onPress={() => removeToast(message.id)}
                >
                  &times;
                </Button>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>,
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
