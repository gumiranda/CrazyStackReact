import { CardBody as CardBodyChakra, CardBodyProps } from "@chakra-ui/react";
export const CardBody = ({ children, ...rest }: CardBodyProps) => {
  return (
    <CardBodyChakra {...rest} data-testid="CardBodyTestId">
      {children}
    </CardBodyChakra>
  );
};
