import { Heading, HStack, FlexProps, Spinner, Icon } from "@chakra-ui/react";
import { Flex, Button } from "@/shared/ui";
import NextLink from "next/link";
import { RiAddLine, RiTable2 } from "react-icons/ri";
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
  return (
    <Flex p={["0", "8"]} justify="space-between" align="center" {...rest}>
      <Heading size="lg" fontWeight="normal">
        {title}
        {!isLoading && isFetching && <Spinner size="sm" color="purple.500" ml="4" />}
      </Heading>
      <HStack spacing="2">
        <NextLink passHref href={routeCreate}>
          <Button
            size="sm"
            fontSize="sm"
            colorScheme={"green"}
            leftIcon={<Icon fontSize="20" as={RiAddLine} />}
          >
            Cadastrar
          </Button>
        </NextLink>
        <NextLink passHref href={routeList}>
          <Button
            size="sm"
            fontSize="sm"
            colorScheme={"purple"}
            leftIcon={<Icon fontSize="20" as={RiTable2} />}
          >
            Tabela
          </Button>
        </NextLink>
      </HStack>
      {children}
    </Flex>
  );
};
