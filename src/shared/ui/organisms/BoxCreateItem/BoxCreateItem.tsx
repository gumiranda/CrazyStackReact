//@ts-nocheck
import { Divider, Heading, VStack } from "@chakra-ui/react";
import { CreateItemActions, Box } from "shared/ui";
interface BoxCreateItemProps {
  onSubmit: any;
  title: string;
  isLoadingSaveButton: boolean;
  cancelRoute: string;
  children: any;
}
export const BoxCreateItem = ({
  onSubmit,
  isLoadingSaveButton = false,
  cancelRoute = "/",
  children,
  title = "Criar novo registro",
}: BoxCreateItemProps) => {
  return (
    <Box
      as="form"
      flex="1"
      borderRadius={8}
      bg="purple.800"
      p={["0", "2", "3", "4"]}
      onSubmit={onSubmit}
    >
      <Heading size="lg" fontWeight={"normal"}>
        {title}
      </Heading>
      <Divider my="6" borderColor="purple.700" />
      <VStack spacing={["6", "8"]}>{children}</VStack>
      <CreateItemActions
        isLoadingSaveButton={isLoadingSaveButton}
        cancelRoute={cancelRoute}
      />
    </Box>
  );
};
