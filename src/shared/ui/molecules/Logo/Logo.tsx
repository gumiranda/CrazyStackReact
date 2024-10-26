import { Text, useBreakpointValue } from "@/shared/ui/atoms";
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
  const isMobile = useBreakpointValue("(max-width: 768px)");
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
      {config.systemName}
      {config.isAdmin && (
        <>
          {isMobile && <br />}
          <Text color="tertiary.500" marginLeft="2" as="span">
            admin
          </Text>
        </>
      )}
    </Text>
  );
};
