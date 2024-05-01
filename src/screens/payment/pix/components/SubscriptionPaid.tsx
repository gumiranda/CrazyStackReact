"use client";

import { FlexScreen } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export const SubscriptionPaid = ({ charge, user }) => {
  const { t } = useTranslation(["PAGES"]);

  if (charge?.brCode) {
    return null;
  }
  return <FlexScreen>eae</FlexScreen>;
};
