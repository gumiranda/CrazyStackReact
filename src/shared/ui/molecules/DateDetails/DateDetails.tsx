import { DateDetails as DateDetailsChakra, DateDetailsProps } from "@chakra-ui/react";
export const DateDetails = ({ children, ...rest }: DateDetailsProps) => {
  return (
    <DateDetailsChakra {...rest} data-testid="DateDetailsTestId">
      {children}
    </DateDetailsChakra>
  );
};
