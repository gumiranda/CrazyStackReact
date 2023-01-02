import { ReactNode } from "react";
import {
  Heading,
  HStack,
  Tooltip,
  FlexProps,
  Spinner,
  Icon,
  Flex,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { RiAddLine, RiFileListLine, RiDeleteBin6Line } from "react-icons/ri";

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
  return (
    <Flex
      p={["0", "8"]}
      justify="space-between"
      align="center"
      {...rest}
      data-testid="TableHeadTestId"
    >
      <Heading size="lg">
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
            leftIcon={<Icon fontSize="20" as={RiFileListLine} />}
          >
            Lista
          </Button>
        </NextLink>
        <Tooltip label="Excluir todos os selecionados">
          <Button onClick={deleteSelectedAction} size="sm" bg="purple.700">
            <Icon fontSize="20" as={RiDeleteBin6Line} />
          </Button>
        </Tooltip>
      </HStack>
      {children}
    </Flex>
  );
};
