import { Avatar as AvatarChakra, AvatarProps } from "@chakra-ui/react";
export const Avatar = ({ children, ...rest }: AvatarProps) => {
  return (
    <AvatarChakra {...rest} data-testid="AvatarTestId">
      {children}
    </AvatarChakra>
  );
};
