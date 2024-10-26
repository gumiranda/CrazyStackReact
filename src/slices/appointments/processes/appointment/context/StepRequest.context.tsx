/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { createContext, useContext, ReactNode, useState } from "react";
type StepRequestProviderProps = {
  children: ReactNode;
};
type StepRequestContextData = { request: any; setRequest: Function };
const StepRequestContext = createContext({} as StepRequestContextData);

export function StepRequestProvider({ children }: StepRequestProviderProps) {
  const [request, setRequest] = useState({});

  return (
    <StepRequestContext.Provider value={{ request, setRequest }}>
      {children}
    </StepRequestContext.Provider>
  );
}
export const isBrowser = typeof window !== "undefined";

export const useStepRequest = () => {
  if (!isBrowser) {
    return {
      request: null,
      setRequest: () => {},
    };
  }
  return useContext(StepRequestContext);
};
