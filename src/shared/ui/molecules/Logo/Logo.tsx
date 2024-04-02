import { Text } from "@/shared/ui/atoms";
import NextLink from "next/link";
import { config } from "@/application/config";
export const Logo = ({ haveLink = true, ...rest }) => {
  if (haveLink) {
    return (
      <NextLink href="/home">
        <SystemNameText {...rest} />
      </NextLink>
    );
  }
  return <SystemNameText {...rest} />;
};
const SystemNameText = ({ marginBottom = 10, ...rest }) => {
  return (
    <Text
      textAlign={"center"}
      fontWeight="bold"
      letterSpacing="tight"
      mb={marginBottom}
      fontSize={["4xl", "5xl"]}
      {...rest}
    >
      {config.systemName}
      {config.isAdmin && (
        <Text color="tertiary.300" marginLeft="2" as="span">
          Admin
        </Text>
      )}
    </Text>
  );
};
