//@ts-nocheck
import { CreateItemActions, Box } from "@/shared/ui";
import { ClientOnly, Skeleton, Separator, Heading, VStack } from "@chakra-ui/react";

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
    <ClientOnly fallback={<Skeleton />}>
      <Box
        as="form"
        flex="1"
        borderRadius={8}
        bg="secondary.500"
        p={["0", "2", "3", "4"]}
        onSubmit={onSubmit}
      >
        <Heading size="lg" fontWeight={"normal"}>
          {title}
        </Heading>
        <Separator my="6" borderColor="secondary.400" />
        <VStack gap={["6", "8"]}>{children}</VStack>
        <CreateItemActions
          isLoadingSaveButton={isLoadingSaveButton}
          cancelRoute={cancelRoute}
        />
      </Box>
    </ClientOnly>
  );
};
