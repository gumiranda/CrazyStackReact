"use client";
import "@/application/i18n.config";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChakraProvider } from "@/application/providers/chakraProvider";
import { AuthProvider, SidebarDrawerProvider, UiProvider } from "@/shared/libs";
import { WebSocketProvider } from "@/application/providers/webSocketProvider";
import { I18nProvider } from "@/application/providers/i18nProvider";
import { ThemeProvider } from "next-themes";

export type AllProviderProps = {
  children: any;
};
export type ProviderProps = {
  children: any;
};
export const AllProviders = ({ children }: AllProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );
  return (
    <ThemeProvider>
      <I18nProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <UiProvider>
              <AuthProvider>
                <SidebarDrawerProvider>
                  <WebSocketProvider>{children}</WebSocketProvider>
                </SidebarDrawerProvider>
              </AuthProvider>
            </UiProvider>
          </ChakraProvider>
          {process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
        </QueryClientProvider>
      </I18nProvider>
    </ThemeProvider>
  );
};
