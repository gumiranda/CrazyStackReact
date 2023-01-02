import { List as ListChakra, ListProps } from "@chakra-ui/react";
export const List = ({ children, ...rest }: ListProps) => {
  return (
    <ListChakra {...rest} data-testid="ListTestId">
      {children}
    </ListChakra>
  );
};
