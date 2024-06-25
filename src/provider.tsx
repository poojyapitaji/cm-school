import { NextUIProvider } from "@nextui-org/system";
import { useNavigate } from "react-router-dom";

import { ProviderWrapperProps } from "./types";
import { ToastProvider } from "./providers/toast-context";
import { ModalProvider } from "./providers/modal-context";

export function Provider({ children }: ProviderWrapperProps) {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <ModalProvider>
        <ToastProvider>{children}</ToastProvider>
      </ModalProvider>
    </NextUIProvider>
  );
}
