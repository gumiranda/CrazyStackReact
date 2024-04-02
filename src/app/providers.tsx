"use client";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChakraProvider } from "@/application/providers/chakraProvider";
import { AuthProvider, SidebarDrawerProvider, UiProvider } from "@/shared/libs";
import { WebSocketProvider } from "@/application/providers/webSocketProvider";

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
  );
};
