import { Icon as IconChakra, IconProps } from "@chakra-ui/react";
export const Icon = (props: IconProps & { as: any }) => {
  return (
    <IconChakra {...props} data-testid="IconTestId">
      {props?.as}
    </IconChakra>
  );
};
