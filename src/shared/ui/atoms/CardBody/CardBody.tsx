import { Card as CardChakra } from "@chakra-ui/react";
export const CardBody = ({ children, ...rest }) => {
  return (
    <CardChakra.Body {...rest} data-testid="CardBodyTestId">
      {children}
    </CardChakra.Body>
  );
};
