import { Card as CardChakra, CardProps } from "@chakra-ui/react";
export const Card = ({ children, ...rest }: CardProps) => {
  return (
    <CardChakra {...rest} data-testid="CardTestId">
      {children}
    </CardChakra>
  );
};
