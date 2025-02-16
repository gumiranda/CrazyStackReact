import { Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "../../atoms";
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
    <Box as="tr">
      <Box as="th" color="purple.200" ml="1px">
        <Checkbox
          colorPalette="green"
          checked={mainChecked}
          onChange={(e) => {
            setMainChecked(!mainChecked);
            setItems((prevState: any) =>
              prevState.map((prevItem: any) => ({
                ...prevItem,
                value: !mainChecked,
              }))
            );
          }}
          children={undefined}
          label={undefined}
        />
      </Box>
      {fields.map((field, index) => (
        <Box
          as="th"
          key={`${Math.random() * 10}-${index}`}
          fontSize={["9", "xs", "sm", "sm"]}
          color="white.50"
        >
          {field.label}
        </Box>
      ))}
      <Box
        as="th"
        color="purple.300"
        fontSize={["9", "xs", "sm", "sm"]}
        style={{ textAlign: "end" }}
      >
        {t("PAGES:MESSAGES.actions", {
          defaultValue: "Ações",
        })}
      </Box>
    </Box>
  );
};
