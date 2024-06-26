"use client";

import { createContext, useMemo, useContext } from "react";
import { parseCookies } from "nookies";

const WSContext = createContext({} as any);

export const isBrowser = typeof window !== "undefined";

export const WebSocketProvider = ({ children }: any) => {
  const wsInstance = useMemo(() => {
    const cookies = parseCookies();
    if (isBrowser) {
      const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/socket`);
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            action: "auth",
            token: `Bearer ${cookies["belezixadmin.token"]}`,
          })
        );
      };
      return ws;
    }
  }, []);
  return <WSContext.Provider value={{ wsInstance }}>{children}</WSContext.Provider>;
};
export const useWS = () => useContext(WSContext);
