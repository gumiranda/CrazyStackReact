import { ReactNode } from "react";
import { TableContent, TableHead, Flex } from "shared/ui";
type Field = {
  id: string;
  label: string;
  displayKeyText: boolean;
  children?: ReactNode;
};
interface GenericTableProps {
  isLoading: boolean;
  children?: ReactNode;
  items: any[];
  fields: Field[];
  setItems: Function;
  linkOnMouseEnter: Function;
  deleteSelectedAction?: () => void;
  error: any;
  route: string;
  routeCreate: string;
  routeList: string;
  routeDetails: string;
  title: string;
}
export const GenericTable = ({
  children,
  isLoading = false,
  error = null,
  items = [],
  fields = [],
  setItems,
  route = "/",
  linkOnMouseEnter,
  routeCreate,
  routeList,
  title,
  deleteSelectedAction,
  routeDetails,
  ...rest
}: GenericTableProps) => {
  return (
    <Flex
      margin={4}
      flexDirection={"column"}
      flexGrow="1"
      data-testid="GenericTableTestId"
    >
      <TableHead
        deleteSelectedAction={deleteSelectedAction}
        routeCreate={routeCreate}
        routeList={routeList}
        title={title}
      />
      <TableContent
        items={items}
        setItems={setItems}
        route={route}
        routeDetails={routeDetails}
        fields={fields}
        linkOnMouseEnter={linkOnMouseEnter}
        isLoading={isLoading}
        error={error}
        {...rest}
      >
        {children}
      </TableContent>
    </Flex>
  );
};
