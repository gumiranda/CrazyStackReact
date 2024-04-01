import React, { useState } from "react";
import { ChakraProvider } from "./chakraProvider";
import { OtherProviders } from "./otherProviders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export type AllProviderProps = {
  children: any;
  pageProps: any;
  Component: any;
};
export type ProviderProps = {
  children: any;
};
export const AllProviders = ({ children, Component, pageProps }: AllProviderProps) => {
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
        <OtherProviders>
          <>
            {children}
            <Component {...pageProps} />
          </>
        </OtherProviders>
      </ChakraProvider>
      {process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};
