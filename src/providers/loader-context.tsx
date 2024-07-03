import React, { createContext, useContext, useState } from "react";

import { LoaderContextType, LoaderProviderProps } from "@/types";
import Loader from "@/components/loader";

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState("");
  const [opacity, setOpacity] = useState(0);

  const show = (opacity: number = 0.9, message: string = "") => {
    setIsActive(true);
    setOpacity(opacity);
    setMessage(message);
  };

  const hide = () => {
    setIsActive(false);
    setOpacity(0);
    setMessage("");
  };

  return (
    <LoaderContext.Provider value={{ show, hide }}>
      {children}
      {isActive && <Loader message={message} opacity={opacity} />}
    </LoaderContext.Provider>
  );
};

export const useLoader = (): LoaderContextType => {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }

  return context;
};
