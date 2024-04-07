"use client";

import { Box, Flex, Text, TimeSlots, WeekDaysSelector } from "@/shared/ui";
import { useHome } from "./useHome.hook";
import { config } from "@/application/config";
import { LoadInvoice } from "@/features/appointment/load-invoice/LoadInvoice";

export function HomePage() {
  const { welcomeTitle } = useHome();
  return (
    <>
      <Flex w="100%" p={5}>
        <Box w="100%">
          <Flex alignItems={"center"} w="100%" justifyContent="space-between">
            <Box>
              <Text fontWeight={"500"} fontSize="2xl">
                {welcomeTitle} 👋
              </Text>
              <Text fontSize={"xl"}>Bem vindo(a) de volta ao {config.systemName}</Text>
            </Box>
          </Flex>
          <Flex>
            <Flex mt={5} gap={5} direction={{ base: "column", md: "row" }}>
              <LoadInvoice />
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <TimeSlots></TimeSlots>
      <WeekDaysSelector />
    </>
  );
}
