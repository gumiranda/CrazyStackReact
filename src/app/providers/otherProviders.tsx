import { ProviderProps } from "./chakraProvider";
import { AuthProvider, UiProvider, SidebarDrawerProvider } from "shared/libs";
export const OtherProviders = ({ children }: ProviderProps) => {
  return (
    <UiProvider>
      <AuthProvider>
        <SidebarDrawerProvider>{children}</SidebarDrawerProvider>
      </AuthProvider>
    </UiProvider>
  );
};
