"use client";

import { Box, FlexBody, FlexFullCenter, QRCode } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { PixHeader } from "./components/PixHeader";
import { PixInstructions } from "./components/PixInstructions";
import { PixDetails } from "./components/PixDetails";
import { PixCopyCode } from "./components/PixCopyCode";
import { ValidateMyPayment } from "./components/ValidateMyPayment";
import { whitelabel } from "@/application/whitelabel";

export const PaymentWithPix = ({ charge, user }) => {
  const { t } = useTranslation(["PAGES"]);

  if (!charge?.brCode) {
    return null;
  }
  return (
    <>
      <PixHeader
        props={{
          title: t("PAGES:PIX_PAY_PAGE.title", {
            defaultValue: "Quase lá! Pague via PIX para concluir sua assinatura",
          }),
          subtitle: t("PAGES:PIX_PAY_PAGE.subtitle", {
            defaultValue:
              "Para pagar no seu banco pela internet, escaneie o QR Code ou copie o código abaixo e cole no app do seu banco.",
            systemName: whitelabel.systemName,
          }),
        }}
      />
      <FlexBody>
        <FlexFullCenter>
          <PixInstructions />
          <br />
          <QRCode code={charge?.brCode} />
        </FlexFullCenter>
        <Box>
          <PixDetails charge={charge} />
          <PixCopyCode code={charge?.brCode} />
          <ValidateMyPayment user={user} />
        </Box>
      </FlexBody>
    </>
  );
};
