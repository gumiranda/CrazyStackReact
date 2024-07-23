import { Link, HStack } from "@chakra-ui/react";
import { Flex, Button } from "@/shared/ui";
import { useTranslation } from "react-i18next";
interface CreateItemActionsProps {
  isLoadingSaveButton: boolean;
  cancelRoute: string;
}

export const CreateItemActions = ({
  isLoadingSaveButton,
  cancelRoute,
}: CreateItemActionsProps) => {
  const { t } = useTranslation(["PAGES"]);

  return (
    <Flex mt="8" justify="flex-end">
      <HStack spacing="4">
        <Link href={cancelRoute}>
          <Button colorScheme={"whiteAlpha"}>
            {t("PAGES:MESSAGES.cancel", {
              defaultValue: "Cancelar",
            })}
          </Button>
        </Link>
        <Button
          type="submit"
          isLoading={isLoadingSaveButton}
          _hover={{ bgColor: "tertiary.500" }}
          bgColor="tertiary.500"
        >
          {t("PAGES:MESSAGES.save", {
            defaultValue: "Salvar",
          })}
        </Button>
      </HStack>
    </Flex>
  );
};
