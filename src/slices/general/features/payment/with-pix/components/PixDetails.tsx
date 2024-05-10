"use client";

import { FlexField, SubFlexField } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export const PixDetails = ({ charge }) => {
  const { t } = useTranslation(["PAGES"]);

  return (
    <FlexField>
      <SubFlexField>
        <SubFlexField.Label>
          {t("PAGES:PIX_PAY_PAGE.value", {
            defaultValue: "Valor: ",
          })}
        </SubFlexField.Label>
        <SubFlexField.Price>{charge?.value / 100}</SubFlexField.Price>
      </SubFlexField>
      <SubFlexField>
        <SubFlexField.Label>
          {t("PAGES:PIX_PAY_PAGE.expiration", {
            defaultValue: "Expiração: ",
          })}
        </SubFlexField.Label>
        <SubFlexField.DateText>{charge?.expiresDate}</SubFlexField.DateText>
      </SubFlexField>
    </FlexField>
  );
};
