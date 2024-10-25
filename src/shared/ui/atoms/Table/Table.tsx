import { Table } from "@chakra-ui/react/table";

export const Table2 = ({ children, headProps, bodyProps, head, ...rest }: any) => {
  return (
    <Table.Root {...rest} data-testid="TableTestId">
      <Table.Header {...headProps}>{head}</Table.Header>
      <Table.Body {...bodyProps}>{children}</Table.Body>
    </Table.Root>
  );
};
