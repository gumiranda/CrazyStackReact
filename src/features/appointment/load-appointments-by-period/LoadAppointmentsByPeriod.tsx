import { Box, Flex, Select, Text } from "@/shared/ui";
import { MdAttachMoney } from "react-icons/md";
import { useLoadAppointmentsByPeriod } from "./useLoadAppointmentsByPeriod.hook";

export const LoadAppointmentsByPeriod = () => {
  const { selectedRange, setSelectedRange, totalAppointments } =
    useLoadAppointmentsByPeriod();
  return (
    <Box
      background="secondary.500"
      borderRadius={"8"}
      p={5}
      width={{ base: "100%", md: "auto" }}
    >
      <Flex gap={1} alignItems={"center"}>
        <MdAttachMoney size={25} />
        <Text fontSize={"2xl"}>Agendamentos</Text>
      </Flex>
      <Select
        size="sm"
        mt={3}
        bg="secondary.500"
        value={selectedRange}
        list={[
          {
            value: "month",
            label: "Último mês",
          },
          {
            value: "week",
            label: "Última semana",
          },
          {
            value: "yesterday",
            label: "Ontem",
          },
          {
            value: "today",
            label: "Hoje",
          },

          {
            value: "tomorrow",
            label: "Amanhã",
          },
        ]}
        keyValue={"value"}
        keyLabel={"label"}
        label={""}
        onChange={(e) => setSelectedRange(e.target.value)}
      />
      <Text mt={2} fontWeight="400" fontSize={"xxx-large"}>
        {totalAppointments}
      </Text>
    </Box>
  );
};
