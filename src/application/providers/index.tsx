import React, { ReactElement, useState } from "react";
import { ChakraProvider } from "./chakraProvider";
import { OtherProviders } from "./otherProviders";
import { QueryClient, QueryClientProvider, Hydrate } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export type AllProviderProps = {
  children: ReactElement;
  pageProps: any;
};
export type ProviderProps = {
  children: ReactElement;
};
export const AllProviders = ({ children, pageProps }: AllProviderProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider>
          <OtherProviders>{children}</OtherProviders>
        </ChakraProvider>
        {process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
      </Hydrate>
    </QueryClientProvider>
  );
};
