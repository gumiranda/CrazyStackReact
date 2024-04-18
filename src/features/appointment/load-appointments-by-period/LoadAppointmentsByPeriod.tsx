import { Box, Flex, Select, Text } from "@/shared/ui";
import { RiCalendar2Line } from "react-icons/ri";
import { useLoadAppointmentsByPeriod } from "./useLoadAppointmentsByPeriod.hook";
import { useTranslation } from "react-i18next";
import { ChartAppointment } from "./ChartAppointment";

export const LoadAppointmentsByPeriod = () => {
  const { t } = useTranslation(["PAGES"]);

  const {
    selectedRange,
    setSelectedRange,
    totalAppointments,
    requestList,
    isFetching,
    hasNextPage,
  } = useLoadAppointmentsByPeriod();
  const showChart = ["month", "week"].includes(selectedRange);
  return (
    <Flex
      background="secondary.500"
      borderRadius={"8"}
      p={5}
      flexDir={{ base: "column", md: "row" }}
      width={{ base: "100%", md: "auto" }}
    >
      {" "}
      <Flex flexDir={"column"}>
        <Flex gap={1} alignItems={"center"}>
          <RiCalendar2Line size={25} />
          <Text fontSize={"2xl"}>
            {t("PAGES:HOME_PAGE.appointmentLabel", {
              defaultValue: "Agendamentos",
            })}
          </Text>
        </Flex>
        <Select
          size="sm"
          mt={3}
          bg="secondary.500"
          value={selectedRange}
          list={[
            {
              value: "month",
              label: t("PAGES:HOME_PAGE.lastMonth", {
                defaultValue: "Último mês",
              }),
            },
            {
              value: "week",
              label: t("PAGES:HOME_PAGE.lastWeek", {
                defaultValue: "Última semana",
              }),
            },
            {
              value: "yesterday",
              label: t("PAGES:HOME_PAGE.yesterday", {
                defaultValue: "Ontem",
              }),
            },
            {
              value: "today",
              label: t("PAGES:HOME_PAGE.today", {
                defaultValue: "Hoje",
              }),
            },

            {
              value: "tomorrow",
              label: t("PAGES:HOME_PAGE.tomorrow", {
                defaultValue: "Amanhã",
              }),
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
      </Flex>
      {showChart && requestList?.length > 0 && (
        <ChartAppointment
          data={requestList}
          error={null}
          isLoading={isFetching && !hasNextPage}
        />
      )}
    </Flex>
  );
};
