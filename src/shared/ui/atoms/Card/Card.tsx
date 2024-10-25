import { Card as CardChakra } from "@chakra-ui/react";

export const Card = ({ children, ...rest }) => {
  return (
    <CardChakra.Root {...rest} data-testid="CardTestId">
      <CardChakra.Body>{children}</CardChakra.Body>
    </CardChakra.Root>
  );
};
