import { config } from "@/application/config";
import { Flex, Box, Text } from "../../atoms";
import { useBreakpointValue } from "@chakra-ui/react";

export const AuthLayout = ({ children, ...rest }: any) => {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  return (
    <Flex
      bgColor="secondary.600"
      flexDir={["column", "column", "row"]}
      align="center"
      justifyContent={"center"}
      overflowY={"hidden"}
      {...rest}
    >
      <Flex flexDir={"column"} w={["100%", "85%"]}>
        {children}
      </Flex>
      {isDesktop && (
        <Flex
          flexDir={"column"}
          width={["100%", "45%"]}
          height={"100vh"}
          alignItems="flex-end"
          backgroundImage={"url(/login-background.png)"}
          backgroundRepeat={"no-repeat"}
          backgroundSize={"cover"}
        >
          <Flex
            flexDir="column"
            width={"100%"}
            p={8}
            backgroundColor="rgba(255,255,255,0.2)"
          >
            <Text fontWeight={"bold"} fontSize={"6xl"} color="white">
              Pensou {config.typeSystem},
            </Text>
            <Flex>
              <Text fontWeight={"bold"} fontSize={"6xl"} color="white">
                Pensou&nbsp;
              </Text>
              <Box>
                <Text fontWeight={"bold"} fontSize={"6xl"} color="white">
                  {config.systemName}.
                </Text>
                <Flex h={1} bgColor="tertiary.500" />
              </Box>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
