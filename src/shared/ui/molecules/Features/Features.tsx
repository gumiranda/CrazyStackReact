import { useTranslation } from "react-i18next";
import { Icon, Box, HStack, List, ListItem, Stack, Text } from "../../atoms";
import { Heading } from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";

export const Features = ({ children, features, ...rest }: any) => {
  const { t } = useTranslation(["PAGES"]);

  return (
    <Box
      bg="white"
      borderWidth={1}
      borderRadius={8}
      px={{ base: 6, md: 8 }}
      py={8}
      w={"full"}
      maxW={"lg"}
      boxShadow={"sm"}
      {...rest}
      data-testid="FeaturesTestId"
    >
      <Stack gap={{ base: 10, md: 8 }} textAlign="center">
        <Stack align="center">
          <Text
            fontWeight={"semibold"}
            textStyle={{ base: "md", md: "lg" }}
            color="gray.800"
          >
            {t("PAGES:PIX_PAGE.titleBox", {
              defaultValue: "Plano mensal de apenas",
            })}
          </Text>
          <Heading
            fontWeight={"semibold"}
            textStyle={{ base: "md", md: "lg" }}
            color="gray.800"
            fontSize="3rem"
          >
            {t("PAGES:PIX_PAGE.price", {
              defaultValue: "R$ 29,90/mês",
            })}
          </Heading>
        </Stack>
        <List gap="4">
          {features.map((feature: string, index: number) => (
            <Box key={feature} color="gray.300">
              <HStack gap="4">
                <Icon as={FiCheck} color="accent" />
                <Text key={index} textStyle={{ base: "sm", md: "md" }} color="gray.800">
                  {feature}
                </Text>
              </HStack>
            </Box>
          ))}
        </List>
        {children}
      </Stack>
    </Box>
  );
};
