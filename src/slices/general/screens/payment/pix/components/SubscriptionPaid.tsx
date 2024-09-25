"use client";

import { PixHeader } from "@/slices/general/features/payment/with-pix/components/PixHeader";
import { FlexFullCenter, SubFlexField, Image } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import pixPicture from "../../../../../../../public/modal-complete-register.png";

export const SubscriptionPaid = ({ charge, user }) => {
  const { t } = useTranslation(["PAGES"]);

  if (charge?.brCode) {
    return null;
  }
  console.log({ user });
  return (
    <FlexFullCenter>
      <PixHeader
        props={{
          title: t("PAGES:PIX_PAID_PAGE.title", {
            defaultValue: "Tudo certo com a sua assinatura!",
          }),
          subtitle: t("PAGES:PIX_PAID_PAGE.subtitle", {
            defaultValue:
              "Sua assinatura está em dia e você já pode aproveitar todos os benefícios do nosso sistema!",
          }),
        }}
      />
      <Image
        src={pixPicture.src}
        width={{ base: "100%", md: "40%" }}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
      />
      {user?.payDay && (
        <SubFlexField>
          <SubFlexField.Label>
            {t("PAGES:PIX_PAID_PAGE.expiration", {
              defaultValue: "Assinatura válida até: ",
            })}
          </SubFlexField.Label>
          <SubFlexField.DateText>{user?.payDay}</SubFlexField.DateText>
        </SubFlexField>
      )}
    </FlexFullCenter>
  );
};
