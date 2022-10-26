import { ProviderProps } from "./chakraProvider";
import { AuthProvider, UiProvider } from "shared/libs";
export const OtherProviders = ({ children }: ProviderProps) => {
  return (
    <UiProvider>
      <AuthProvider>{children}</AuthProvider>
    </UiProvider>
  );
};
