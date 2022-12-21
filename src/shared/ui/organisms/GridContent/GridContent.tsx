import { Skeleton, Stack, Flex, Text } from "@chakra-ui/react";
import { GenericListGrid } from "shared/ui/molecules";

type Field = {
  id: string;
  label: string;
  displayKeyText: boolean;
  children?: React.ReactNode;
};
interface GridContentProps {
  isLoading: boolean;
  children?: any;
  items: any[];
  fields: Field[];
  renderItem: React.FC;
  error: any;
  route: string;
  entityDisplayName: string;
}

export const GridContent = ({
  children,
  isLoading = false,
  items = [],
  fields = [],
  renderItem,
  error = null,
  route = "/",
  entityDisplayName,
  ...rest
}: GridContentProps) => {
  return (
    <>
      {isLoading || !items ? (
        <Stack>
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      ) : error ? (
        <Flex justify="center">
          <Text>Falha ao obter {entityDisplayName}s</Text>
        </Flex>
      ) : (
        <GenericListGrid items={items} renderItem={renderItem} {...rest}>
          {children}
        </GenericListGrid>
      )}
    </>
  );
};
