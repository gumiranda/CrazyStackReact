"use client";

import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  DatePicker,
  Select,
  TimeSlots,
  WeekDaysSelector,
} from "@/shared/ui";
import { useHome } from "./useHome.hook";
import { LoadInvoice } from "@/slices/appointments/features/appointment/load-invoice/LoadInvoice";
import { LoadAppointmentsByPeriod } from "@/slices/appointments/features/appointment/load-appointments-by-period/LoadAppointmentsByPeriod";
import { statusMap } from "../../entidades/request/request.model";

export function convertToDate(dateString) {
  // Split the date string into day, month, and year
  const parts = dateString.split("/");

  // Create a new Date object
  // Note: Months are zero-indexed in JavaScript Date objects, so we need to subtract 1 from the month
  const dateObject = new Date(parts[2], parts[1] - 1, parts[0]);

  return dateObject;
}
export function HomePage() {
  const {
    welcomeTitle,
    description,
    selectedDay,
    selectedDate,
    handleDayClick,
    dayFormatted,
    requestList,
    setSelectedDate,
    status,
    setStatus,
    setEndDate,
  } = useHome();
  return (
    <>
      <Flex w="100%" p={5} direction="column" align="center" minHeight="100vh">
        <Box w="100%" maxW="1200px">
          <VStack spacing={5} align="stretch">
            <Flex flexDir="column" alignSelf={"flex-start"}>
              <Text fontWeight="600" fontSize="3xl">
                {welcomeTitle} 👋
              </Text>
              <Text fontSize={"lg"}>{description}</Text>
            </Flex>
            <HStack spacing={10} justify="center" flexWrap="wrap">
              <LoadInvoice />
              <LoadAppointmentsByPeriod />
            </HStack>
          </VStack>
        </Box>

        <Flex my={4} mt={5} w="100%">
          <Box w={"100%"}>
            <WeekDaysSelector
              selectedDay={selectedDay}
              onDayClick={handleDayClick}
              dayFormatted={dayFormatted}
              selectedDate={selectedDate}
            />
            <TimeSlots list={requestList} />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
