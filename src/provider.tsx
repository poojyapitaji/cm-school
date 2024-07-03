import { NextUIProvider } from "@nextui-org/system";
import { useNavigate } from "react-router-dom";

import { ProviderWrapperProps } from "./types";
import { ToastProvider } from "./providers/toast-context";
import { ModalProvider } from "./providers/modal-context";
import { LoaderProvider } from "./providers/loader-context";

export function Provider({ children }: ProviderWrapperProps) {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <LoaderProvider>
        <ModalProvider>
          <ToastProvider>{children}</ToastProvider>
        </ModalProvider>
      </LoaderProvider>
    </NextUIProvider>
  );
}
