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
  useEffect(() => {
    disclosure.onClose();
  }, [disclosure]);
  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}
export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
