import { useMemo } from "react";
import { Box, Text } from "../../atoms";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const DateDetails = ({ initDate, endDate }) => {
  const dateFormatted = useMemo(
    () => format(new Date(initDate), "dd/MM/yyyy"),
    [initDate]
  );
  const hour = useMemo(() => {
    const formattedInitDate = initDate
      ? format(new Date(initDate), "HH:mm", { locale: ptBR })
      : "";
    const formattedEndDate = endDate
      ? format(new Date(endDate), "HH:mm", { locale: ptBR })
      : "";
    return `${formattedInitDate} - ${formattedEndDate}`;
  }, [initDate, endDate]);
  return (
    <Box mt={2}>
      <Text
        color="gray.500"
        fontSize="2xl"
        textAlign={"center"}
        mt={1}
        fontWeight={"400"}
        textTransform={"capitalize"}
      >
        {dateFormatted}
      </Text>
      <Text mt={3} mb={6} color="gray.500" fontSize="3xl" textAlign={"center"}>
        {hour}
      </Text>
    </Box>
  );
};
