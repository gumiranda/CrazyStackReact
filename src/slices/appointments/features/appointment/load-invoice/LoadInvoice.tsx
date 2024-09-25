import { Box, Flex, Select, Text } from "@/shared/ui";
import { MdAttachMoney } from "react-icons/md";
import { useLoadInvoice } from "./useLoadInvoice.hook";
import { useTranslation } from "react-i18next";

export const LoadInvoice = () => {
  const { t } = useTranslation(["PAGES"]);

  const { selectedRangeInvoice, setSelectedRangeInvoice, totalIncome } = useLoadInvoice();
  return (
    <Box
      background="primary.600"
      borderRadius={"8"}
      p={5}
      width={{ base: "100%", md: "auto" }}
    >
      <Flex gap={1} alignItems={"center"}>
        <MdAttachMoney size={25} />
        <Text fontSize={"2xl"}>
          {t("PAGES:HOME_PAGE.invoiceLabel", {
            defaultValue: "Faturamento",
          })}
        </Text>
      </Flex>
      <Select
        size="sm"
        mt={3}
        bg="primary.600"
        value={selectedRangeInvoice}
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
        onChange={(e) => setSelectedRangeInvoice(e.target.value)}
      />
      <Text mt={2} fontWeight="400" fontSize={"xxx-large"}>
        {totalIncome}
      </Text>
    </Box>
  );
};
