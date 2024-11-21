import { Link, HStack } from "@chakra-ui/react";
import { Flex, Button } from "@/shared/ui";
import { useTranslation } from "react-i18next";

interface CreateItemActionsProps {
  isLoadingSaveButton: boolean;
  cancelRoute: string;
}

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// `;
// const pulse = keyframes`
// 0% {
//   transform: scale(1);
//   box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
// }
// 50% {
//   transform: scale(1.05);
//   box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
// }
// 100% {
//   transform: scale(1);
//   box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
// }
// `;

export const CreateItemActions = ({
  isLoadingSaveButton,
  cancelRoute,
}: CreateItemActionsProps) => {
  const { t } = useTranslation(["PAGES"]);

  return (
    <Flex mt="8" justify="flex-end" p={4} borderRadius="md" boxShadow={"md"}>
      <HStack gap="4">
        <Link href={cancelRoute}>
          <Button
            bgColor="gray.300"
            border="1px solid"
            borderColor="gray.300"
            borderRadius="full"
            boxShadow={"base"}
            _hover={{ bg: "gray.200", transform: "scale(1.25)" }}
          >
            {t("PAGES:MESSAGES.cancel", {
              defaultValue: "Cancelar",
            })}
          </Button>
        </Link>
        <Button
          type="submit"
          // isLoading={isLoadingSaveButton}
          _hover={{ bgColor: "tertiary.300" }}
          bgColor="tertiary.500"
          borderRadius="full"
          boxShadow={"base"}
          color="white"
        >
          {t("PAGES:MESSAGES.save", {
            defaultValue: "Salvar",
          })}
        </Button>
      </HStack>
    </Flex>
  );
};
