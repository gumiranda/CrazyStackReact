import { Box, Flex, Select, Text } from "@/shared/ui";
import { MdAttachMoney } from "react-icons/md";
import { useLoadInvoice } from "./useLoadInvoice.hook";

export const LoadInvoice = () => {
  const { selectedRangeInvoice, setSelectedRangeInvoice } = useLoadInvoice();
  return (
    <Box
      background="primary.600"
      borderRadius={"8"}
      p={5}
      width={{ base: "100%", md: "auto" }}
    >
      <Flex gap={1} alignItems={"center"}>
        <MdAttachMoney size={25} />
        <Text fontSize={"2xl"}>Faturamento</Text>
      </Flex>
      <Select
        size="sm"
        mt={3}
        bg="primary.600"
        value={selectedRangeInvoice}
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
        onChange={(e) => setSelectedRangeInvoice(e.target.value)}
      />
    </Box>
  );
};
