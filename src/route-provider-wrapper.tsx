import { ProviderWrapperProps } from "./types";

export function RouteProviderWrapper({
  providers = [],
  children,
}: ProviderWrapperProps) {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
}
