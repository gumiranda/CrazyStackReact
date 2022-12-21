import { GridContent, GridHead, Flex } from "shared/ui";
type Field = {
  id: string;
  label: string;
  displayKeyText: boolean;
  children?: React.ReactNode;
};

interface GenericGridProps {
  isLoading: boolean;
  children?: any;
  items: any[];
  fields: Field[];
  renderItem: React.FC;
  error: any;
  route: string;
  routeList: string;
  routeCreate: string;
  entityDisplayName: string;
  title: string;
}
export const GenericGrid = ({
  children,
  isLoading = false,
  items = [],
  fields = [],
  renderItem,
  error = null,
  route = "/",
  routeList = "/",
  routeCreate = "/",
  entityDisplayName,
  title,
  ...rest
}: GenericGridProps) => {
  return (
    <Flex margin={4} flexDir="column" flexGrow="1">
      <GridHead routeCreate={routeCreate} title={title} routeList={routeList} />
      <GridContent
        entityDisplayName={entityDisplayName}
        items={items}
        route={route}
        fields={fields}
        isLoading={isLoading}
        renderItem={renderItem}
        error={error}
        {...rest}
      >
        {children}
      </GridContent>
    </Flex>
  );
};
