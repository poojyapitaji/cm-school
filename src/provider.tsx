import { NextUIProvider } from "@nextui-org/system";
import { useNavigate } from "react-router-dom";

import { ProviderWrapperProps } from "./types";
import { ToastProvider } from "./providers/toast-context";

export function Provider({ children }: ProviderWrapperProps) {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <ToastProvider>{children}</ToastProvider>
    </NextUIProvider>
  );
}
