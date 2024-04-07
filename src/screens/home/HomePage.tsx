"use client";

import { Box, Flex, Text, TimeSlots, WeekDaysSelector } from "@/shared/ui";
import { useHome } from "./useHome.hook";
import { config } from "@/application/config";
import { LoadInvoice } from "@/features/appointment/load-invoice/LoadInvoice";
import { LoadAppointmentsByPeriod } from "@/features/appointment/load-appointments-by-period/LoadAppointmentsByPeriod";

export function HomePage() {
  const { welcomeTitle, selectedDay, selectedDate, handleDayClick, dayFormatted } =
    useHome();
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
          <Flex w="100%" alignItems={"center"} justifyContent="flex-start">
            <Flex mt={5} direction={{ base: "column", md: "row" }}>
              <LoadInvoice />
            </Flex>
            <Flex ml={2} mt={5} direction={{ base: "column", md: "row" }}>
              <LoadAppointmentsByPeriod />
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <Flex mt={5}>
        <Box w={"100%"} p={10}>
          <WeekDaysSelector
            selectedDay={selectedDay}
            onDayClick={handleDayClick}
            dayFormatted={dayFormatted}
            selectedDate={selectedDate}
          />
          <TimeSlots></TimeSlots>
        </Box>
      </Flex>
    </>
  );
}
