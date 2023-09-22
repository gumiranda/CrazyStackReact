import { ProviderProps } from "./chakraProvider";
import { AuthProvider, UiProvider, SidebarDrawerProvider } from "shared/libs";
import { WebSocketProvider } from "./webSocketProvider";
export const OtherProviders = ({ children }: ProviderProps) => {
  return (
    <UiProvider>
      <AuthProvider>
        <SidebarDrawerProvider>
          <WebSocketProvider>{children}</WebSocketProvider>
        </SidebarDrawerProvider>
      </AuthProvider>
    </UiProvider>
  );
};
