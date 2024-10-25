import { Tr, Th, Checkbox } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
export type Field = {
  id: string;
  label: string;
  displayKeyText: boolean;
  children?: any;
};

interface HeadProps {
  fields: Field[];
  mainChecked: boolean;
  setMainChecked: Function;
  setItems: Function;
}

export const Head = ({
  fields = [],
  mainChecked = false,
  setMainChecked,
  setItems,
}: HeadProps) => {
  const { t } = useTranslation(["PAGES"]);

  return (
    <Tr>
      <Th px={["2", "2", "3"]} color="purple.200" width={["2", "4", "8"]}>
        <Checkbox
          colorPalette="green"
          isChecked={mainChecked}
          onChange={(e) => {
            setMainChecked(!mainChecked);
            setItems((prevState: any) =>
              prevState.map((prevItem: any) => ({
                ...prevItem,
                value: !mainChecked,
              }))
            );
          }}
        />
      </Th>
      {fields.map((field, index) => (
        <Th
          key={`${Math.random() * 10}-${index}`}
          fontSize={["9", "xs", "sm", "sm"]}
          color="white.50"
        >
          {field.label}
        </Th>
      ))}
      <Th
        color="purple.300"
        fontSize={["9", "xs", "sm", "sm"]}
        style={{ textAlign: "end" }}
      >
        {t("PAGES:MESSAGES.actions", {
          defaultValue: "Ações",
        })}
      </Th>
    </Tr>
  );
};
