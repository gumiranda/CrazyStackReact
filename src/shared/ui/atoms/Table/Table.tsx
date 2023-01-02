import {
  Table as TableChakra,
  TableProps,
  Thead,
  Tbody,
  TableHeadProps,
  TableBodyProps,
} from "@chakra-ui/react";
interface TableAtomProps extends TableProps {
  head: React.ReactNode;
  children: React.ReactNode;
  headProps?: TableHeadProps;
  bodyProps?: TableBodyProps;
}
export const Table = ({
  children,
  headProps,
  bodyProps,
  head,
  ...rest
}: TableAtomProps) => {
  return (
    <TableChakra {...rest} data-testid="TableTestId">
      <Thead {...headProps}>{head}</Thead>
      <Tbody {...bodyProps}>{children}</Tbody>
    </TableChakra>
  );
};
