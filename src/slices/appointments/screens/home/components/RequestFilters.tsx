import { Box, DatePicker, Flex, Select } from "@/shared/ui";
import { statusMap } from "@/slices/appointments/entidades/request/request.model";

export const RequestFilters = ({
  props: { setSelectedDate, setEndDate, status, setStatus },
}) => {
  return (
    <Flex
      flexDirection="column"
      alignItems={"center"}
      justifyContent={"space-between"}
      px={4}
      mb={8}
    >
      <DatePicker
        placeholder="Selecione o dia da agenda"
        name="date"
        label="Dia da agenda"
        onChange={(date) => {
          setSelectedDate(convertToDate(date));
          setEndDate(convertToDate(date));
        }}
      />
      <Select
        mt={4}
        w={"16rem"}
        borderRadius="md"
        list={[" ", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => ({
          value: item,
          label: statusMap[item as any],
        }))}
        keyValue="value"
        keyLabel="label"
        label="Status do agendamento"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
    </Flex>
  );
};

export function convertToDate(dateString) {
  // Split the date string into day, month, and year
  const parts = dateString.split("/");

  // Create a new Date object
  // Note: Months are zero-indexed in JavaScript Date objects, so we need to subtract 1 from the month
  const dateObject = new Date(parts[2], parts[1] - 1, parts[0]);

  return dateObject;
}
