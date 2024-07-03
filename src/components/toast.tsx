import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@nextui-org/react";

import { ToastMessage, ToastProps } from "@/types";

const Toast: React.FC<ToastProps> = ({ messages, removeToast }) => {
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

  const toastVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
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
    </AnimatePresence>
  );
};

export default Toast;
