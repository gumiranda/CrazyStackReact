"use client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export const ValidateMyPayment = ({ user }) => {
  const { t } = useTranslation(["PAGES"]);
  const queryClient = useQueryClient();

  return (
    <Button
      colorScheme="primary"
      w="100%"
      mt={10}
      onClick={() => {
        queryClient.invalidateQueries({ queryKey: ["subscription", user?._id] });
        queryClient.invalidateQueries({ queryKey: ["user", user?._id] });
      }}
    >
      {t("PAGES:PIX_PAY_PAGE.validateMyPayment", {
        defaultValue: "VALIDAR MEU PAGAMENTO",
      })}
    </Button>
  );
};
