import { Text } from "@/shared/ui/atoms";
import NextLink from "next/link";
import { whitelabel } from "@/application/whitelabel";
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
      mt={1}
      lineHeight={0.8}
      fontSize={["4xl", "5xl"]}
      {...rest}
    >
      {whitelabel.systemName}
      {whitelabel.isAdmin && (
        <>
          <Text color="tertiary.500" marginLeft="2" as="span">
            admin
          </Text>
        </>
      )}
    </Text>
  );
};
