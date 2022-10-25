import { ProviderProps } from "./chakraProvider";
import { AuthProvider } from "shared/libs";
export const OtherProviders = ({ children }: ProviderProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};
