"use client";

import { Text, Heading } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export const PixHeader = ({ props: { title, subtitle } }) => {
  const { t } = useTranslation(["PAGES"]);

  return (
    <>
      <Heading fontSize={"3xl"}>{title}</Heading>
      <Text fontSize="xl" fontWeight={"400"}>
        {subtitle}
      </Text>
    </>
  );
};
