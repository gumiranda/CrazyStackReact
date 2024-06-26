/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { createContext, useContext, ReactNode, useEffect } from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
type SidebarDrawerProviderProps = {
  children: ReactNode;
};
type SidebarDrawerContextData = UseDisclosureReturn;
const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure();
  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}
export const useSidebarDrawer = () => {
  if (typeof window === "undefined") return null;

  return useContext(SidebarDrawerContext);
};
