import { Text } from "shared/ui/atoms";

export const Logo = () => {
  return (
    <Text fontWeight="bold" letterSpacing="tight" w="64" fontSize={["2xl", "3xl"]}>
      Belezix
      <Text color="green.300" marginLeft="2" as="span">
        Admin
      </Text>
    </Text>
  );
};
