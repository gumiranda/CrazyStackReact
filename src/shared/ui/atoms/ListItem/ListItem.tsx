import { ListItem as ListItemChakra, ListItemProps } from "@chakra-ui/react";
export const ListItem = ({ children, ...rest }: ListItemProps) => {
  return (
    <ListItemChakra {...rest} data-testid="ListItemTestId">
      {children}
    </ListItemChakra>
  );
};
