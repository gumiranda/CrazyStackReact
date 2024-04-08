import { Flex as FlexChakra, FlexProps } from "@chakra-ui/react";
interface HeaderProps extends FlexProps {
  children?: React.ReactNode;
}
export const Header = ({ children, ...rest }: HeaderProps) => {
  return (
    <FlexChakra
      as="header"
      pt={1}
      w="100%"
      align="center"
      paddingX={["0", "0", "2", "4"]}
      top="0"
      zIndex={99}
      position="sticky"
      bgColor="secondary.600"
      {...rest}
      data-testid="HeaderTestId"
    >
      {children}
    </FlexChakra>
  );
};
