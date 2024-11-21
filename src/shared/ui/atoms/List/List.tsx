import { List as ListChakra } from "@chakra-ui/react";

export const List = ({ children, ...rest }) => {
  return <ListChakra.Root {...rest}>{children}</ListChakra.Root>;
};
