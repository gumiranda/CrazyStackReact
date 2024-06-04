import { Container as ContainerChakra, ContainerProps } from "@chakra-ui/react";
export const Container = ({ children, ...rest }: ContainerProps) => {
  return (
    <ContainerChakra {...rest} data-testid="ContainerTestId">
      {children}
    </ContainerChakra>
  );
};
