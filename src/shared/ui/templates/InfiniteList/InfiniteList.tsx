"use client";

import React, { useEffect, useState, useRef } from "react";
import { Flex, Box } from "@/shared/ui";

interface InfiniteListProps {
  children: React.ReactNode;
  hasNextPage: boolean;
  fetchNextPage: Function;
  entityName: string;
}

export const InfiniteList = ({
  children,
  hasNextPage,
  fetchNextPage,
  entityName,
}: InfiniteListProps) => {
  const [element, setElement] = useState<any>(null);
  const observer = useRef<IntersectionObserver>();
  const prevY = useRef(0);
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        const { y } = firstEntry.boundingClientRect;
        if (prevY.current > y) {
          fetchNextPage();
        }
        prevY.current = y;
      },
      { threshold: 0.5 }
    );
  }, []);
  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver?.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        currentObserver?.unobserve(currentElement);
      }
    };
  }, [element]);
  return (
    <Flex flexGrow="1" flexDir="column">
      <Box borderRadius={8} bg="secondary.500" p="8" minH="89vh">
        {children}
      </Box>
      <Box justifySelf={"flex-end"} bg="purple.800" p="8">
        {hasNextPage ? (
          <h1 ref={setElement}>Carregando {entityName}...</h1>
        ) : (
          <h1 ref={setElement}>Não há mais {entityName}...</h1>
        )}
      </Box>
    </Flex>
  );
};
