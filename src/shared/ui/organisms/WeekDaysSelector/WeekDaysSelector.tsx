import { IconButton, Hide, Box } from "@chakra-ui/react";
import { Button, Flex, Text } from "../../atoms";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useTranslation } from "react-i18next";
export const WeekDaysSelector = ({
  selectedDay,
  onDayClick,
  dayFormatted,
  selectedDate,
}) => {
  const { t } = useTranslation(["PAGES"]);
  function getDayButtonBackground(dayIndex: number) {
    return selectedDay === dayIndex ? "tertiary.500" : "secondary.500";
  }
  function getDayButtonHoverColor(dayIndex: number) {
    return selectedDay === dayIndex ? "tertiary.500" : "gray.600";
  }
  return (
    <Flex
      justify={"center"}
      alignItems={"center"}
      w="100%"
      flexDir={{ base: "column", md: "row" }}
      alignSelf="center"
      p={4}
      bg="secondary.500"
      borderRadius="md"
      boxShadow="md"
      color="white"
    >
      <Hide breakpoint="(max-width: 765px)">
        <Flex my={4} justifyContent={"space-between"} w={{ base: "100%", md: "auto" }}>
          <IconButton
            size={["xs", "sm", "md", "lg"]}
            aria-label="Voltar dia"
            icon={<BsChevronLeft />}
            mr={{ base: 0, md: 4 }}
            onClick={() => {
              if (selectedDay > 0 && selectedDay < 7) {
                onDayClick({ dayIndex: selectedDay - 1, extraDiff: 0 });
              } else if (selectedDay === 0) {
                onDayClick({ dayIndex: 6, extraDiff: -7 });
              }
            }}
          />
        </Flex>
      </Hide>
      <Flex my={4} justifyContent={"center"} w="100%">
        {daysOfWeek.map((day, index) => {
          const newdaynumber = Number(dayFormatted) + (index - selectedDay);
          const monthFormatted = Number(new Date(selectedDate).getMonth());
          const yearFormatted = Number(new Date(selectedDate).getFullYear());
          const dateIndex = new Date(yearFormatted, monthFormatted, newdaynumber);
          const dayNumberOfWeek = dateIndex.getDate();
          const monthNumberOfWeek = dateIndex.toLocaleDateString("pt-BR", {
            month: "short",
          });
          return (
            <Box key={`${index}-${selectedDate?.getTime?.()}`} textAlign="center" mx={1}>
              <Text fontSize="md" fontWeight="bold" color="white">
                {dayNumberOfWeek}
              </Text>
              <Text fontSize="sm" color="gray.400">
                {monthNumberOfWeek?.replace?.(".", "")}
              </Text>
              <Button
                size={["xs", "sm", "md", "lg"]}
                aria-label={day}
                color="white"
                mx={1}
                bg={getDayButtonBackground(index)}
                _hover={{
                  bg: getDayButtonHoverColor(index),
                }}
                onClick={() => onDayClick({ dayIndex: index, extraDiff: 0 })}
              >
                {day}
              </Button>
            </Box>
          );
        })}
      </Flex>
      <Hide breakpoint="(max-width: 765px)">
        <IconRight props={{ selectedDay, onDayClick }} />
      </Hide>
    </Flex>
  );
};
export const IconRight = ({ props: { selectedDay, onDayClick } }) => {
  return (
    <IconButton
      size={["xs", "sm", "md", "lg"]}
      aria-label="Avançar dia"
      icon={<BsChevronRight />}
      ml={{ base: 0, md: 4 }}
      onClick={() => {
        if (selectedDay >= 6) {
          onDayClick({ dayIndex: 0, extraDiff: 7 });
          return;
        }
        onDayClick({ dayIndex: selectedDay + 1, extraDiff: 0 });
      }}
    />
  );
};
const daysOfWeek = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
