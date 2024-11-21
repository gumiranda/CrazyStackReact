import { ReactNode } from "react";
import {
  Heading,
  HStack,
  FlexProps,
  Spinner,
  Flex,
  Button,
  IconButton,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { RiAddLine, RiFileListLine, RiDeleteBin6Line } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@/components/ui/tooltip";
import { Icon, useBreakpointValue } from "../../atoms";

interface TableHeadProps extends FlexProps {
  children?: ReactNode;
  isLoading?: boolean;
  isFetching?: boolean;
  routeCreate: string;
  routeList: string;
  title: string;
  deleteSelectedAction?: () => void;
}
export const TableHead = ({
  children,
  deleteSelectedAction,
  isLoading = false,
  isFetching = false,
  routeCreate = "/",
  routeList = "/",
  title,
  ...rest
}: TableHeadProps) => {
  const { t } = useTranslation(["PAGES"]);
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Flex
      p={["0", "2"]}
      justify="space-between"
      align="center"
      {...rest}
      data-testid="TableHeadTestId"
    >
      <Heading fontSize={["sm", "xl", "2xl", "2xl"]}>
        {title}
        {!isLoading && isFetching && <Spinner size="sm" color="white" ml="4" />}
      </Heading>
      <HStack gap="2">
        <NextLink passHref href={routeCreate}>
          {!isMobile ? (
            <Button
              size="sm"
              fontSize="sm"
              bgColor={"tertiary.500"}
              _hover={{ bgColor: "tertiary.500" }}
              // leftIcon={<Icon fontSize="20" as={RiAddLine} />}
            >
              {t("PAGES:MESSAGES.createNew", {
                defaultValue: "Cadastrar",
              })}
            </Button>
          ) : (
            <Tooltip
              content={t("PAGES:MESSAGES.createNew", {
                defaultValue: "Cadastrar",
              })}
            >
              <IconButton
                size="sm"
                fontSize="sm"
                bgColor={"tertiary.500"}
                _hover={{ bgColor: "tertiary.500" }}
                children={<Icon fontSize="20" as={RiAddLine} />}
                aria-label={t("PAGES:MESSAGES.createNew", {
                  defaultValue: "Cadastrar",
                })}
              />
            </Tooltip>
          )}
        </NextLink>
        <NextLink passHref href={routeList}>
          {!isMobile ? (
            <Button
              size="sm"
              fontSize="sm"
              colorPalette={"purple"}
              // leftIcon={<Icon fontSize="20" as={RiFileListLine} />}
            >
              {t("PAGES:MESSAGES.list", {
                defaultValue: "Lista",
              })}
            </Button>
          ) : (
            <Tooltip
              content={t("PAGES:MESSAGES.list", {
                defaultValue: "Lista",
              })}
            >
              <IconButton
                size="sm"
                fontSize="sm"
                colorPalette={"purple"}
                children={<Icon fontSize="20" as={RiFileListLine} />}
                aria-label={t("PAGES:MESSAGES.list", {
                  defaultValue: "Lista",
                })}
              />
            </Tooltip>
          )}
        </NextLink>
        <Tooltip
          content={t("PAGES:MESSAGES.delete", {
            defaultValue: "Deletar selecionados",
          })}
        >
          <IconButton
            size="sm"
            fontSize="sm"
            colorPalette={"red"}
            onClick={deleteSelectedAction}
            children={<Icon fontSize="20" as={RiDeleteBin6Line} />}
            aria-label={t("PAGES:MESSAGES.list", {
              defaultValue: "Lista",
            })}
          />
        </Tooltip>
      </HStack>
      {children}
    </Flex>
  );
};
