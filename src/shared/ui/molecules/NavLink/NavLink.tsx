import { Icon, Flex as NavLinkChakra, FlexProps } from "@chakra-ui/react";
import { ElementType } from "react";
import { ActiveLink, Text } from "shared/ui/atoms";
interface NavLinkProps extends FlexProps {
  icon: ElementType;
  children: string;
  href: string;
}
export const NavLink = ({ icon, href, children, ...rest }: NavLinkProps) => {
  return (
    <ActiveLink href={href} passHref>
      <NavLinkChakra display="flex" align="center" {...rest} data-testid="NavLinkTestId">
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </NavLinkChakra>
    </ActiveLink>
  );
};
