import { Link, HStack } from "@chakra-ui/react";
import { Flex, Button } from "shared/ui";
interface CreateItemActionsProps {
  isLoadingSaveButton: boolean;
  cancelRoute: string;
}

export const CreateItemActions = ({
  isLoadingSaveButton,
  cancelRoute,
}: CreateItemActionsProps) => {
  return (
    <Flex mt="8" justify="flex-end">
      <HStack spacing="4">
        <Link href={cancelRoute}>
          <Button colorScheme={"whiteAlpha"}>Cancelar</Button>
        </Link>
        <Button type="submit" isLoading={isLoadingSaveButton} colorScheme="green">
          Salvar
        </Button>
      </HStack>
    </Flex>
  );
};
