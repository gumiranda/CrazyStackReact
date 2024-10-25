import { Heading, HStack, FlexProps, Spinner, Icon } from "@chakra-ui/react";
import { Flex, Button } from "@/shared/ui";
import NextLink from "next/link";
import { RiAddLine, RiTable2 } from "react-icons/ri";
import { useTranslation } from "react-i18next";

interface GridHeadProps extends FlexProps {
  isLoading?: boolean;
  isFetching?: boolean;
  routeCreate?: string;
  routeList?: string;
  title: string;
  deleteSelectedAction?: Function;
  children?: React.ReactNode;
}

export const GridHead = ({
  children,
  isLoading = false,
  isFetching = false,
  routeCreate = "/",
  routeList = "/",
  title,
  deleteSelectedAction,
  ...rest
}: GridHeadProps) => {
  const { t } = useTranslation(["PAGES"]);

  return (
    <Flex p={["0", "8"]} justify="space-between" align="center" {...rest}>
      <Heading size="lg" fontWeight="normal">
        {title}
        {!isLoading && isFetching && <Spinner size="sm" color="secondary.500" ml="4" />}
      </Heading>
      <HStack gap="2">
        <NextLink passHref href={routeCreate}>
          <Button
            size="sm"
            fontSize="sm"
            colorPalette={"tertiary"}
            leftIcon={<Icon fontSize="20" as={RiAddLine} />}
          >
            {t("PAGES:MESSAGES.createNew", {
              defaultValue: "Cadastrar",
            })}
          </Button>
        </NextLink>
        <NextLink passHref href={routeList}>
          <Button
            size="sm"
            fontSize="sm"
            colorPalette={"purple"}
            leftIcon={<Icon fontSize="20" as={RiTable2} />}
          >
            {t("PAGES:MESSAGES.table", {
              defaultValue: "tabela",
            })}
          </Button>
        </NextLink>
      </HStack>
      {children}
    </Flex>
  );
};
