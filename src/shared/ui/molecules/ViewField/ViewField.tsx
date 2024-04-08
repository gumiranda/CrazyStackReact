import { ViewField as ViewFieldChakra, ViewFieldProps } from "@chakra-ui/react";
export const ViewField = ({ children, ...rest }: ViewFieldProps) => {
  return (
    <ViewFieldChakra {...rest} data-testid="ViewFieldTestId">
      {children}
    </ViewFieldChakra>
  );
};
