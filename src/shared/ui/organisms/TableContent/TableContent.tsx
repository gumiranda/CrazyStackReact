import { Skeleton, Stack, Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { TableItems } from "shared/ui/molecules";
type Field = {
  id: string;
  label: string;
  displayKeyText: boolean;
  children?: ReactNode;
};
interface TableContentProps {
  isLoading: boolean;
  children?: ReactNode;
  items: any[];
  fields: Field[];
  setItems: Function;
  linkOnMouseEnter: Function;
  error: any;
  route: string;
  routeDetails: string;
}
export const TableContent = ({
  children,
  isLoading = false,
  error = null,
  items = [],
  fields = [],
  setItems,
  route = "/",
  linkOnMouseEnter,
  routeDetails,
  ...rest
}: TableContentProps) => {
  return (
    <>
      {isLoading || !items ? (
        <Stack>
          <Skeleton height={"40px"} />
          <Skeleton height={"40px"} />
          <Skeleton height={"40px"} />
          <Skeleton height={"40px"} />
          <Skeleton height={"40px"} />
          <Skeleton height={"40px"} />
          <Skeleton height={"40px"} />
          <Skeleton height={"40px"} />
          <Skeleton height={"40px"} />
          <Skeleton height={"40px"} />
          <Skeleton height={"40px"} />
          <Skeleton height={"40px"} />
          <Skeleton height={"40px"} />
          <Skeleton height={"40px"} />
          <Skeleton height={"40px"} />
          <Skeleton height={"40px"} />
          <Skeleton height={"40px"} />
        </Stack>
      ) : error ? (
        <Flex justify="center">
          <Text>Nenhum registro encontrado</Text>
        </Flex>
      ) : (
        <TableItems
          items={items}
          setItems={setItems}
          route={route}
          routeDetails={routeDetails}
          fields={fields}
          linkOnMouseEnter={linkOnMouseEnter}
          {...rest}
        >
          {children}
        </TableItems>
      )}
    </>
  );
};
