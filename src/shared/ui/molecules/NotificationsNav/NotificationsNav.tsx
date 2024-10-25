import { HStack } from "@chakra-ui/react";
import { RiNotificationLine } from "react-icons/ri";
import { IconButton } from "@chakra-ui/react";
export const NotificationsNav = () => {
  return (
    <HStack
      gap={["3", "4"]}
      mx={["3", "4"]}
      pr={["3", "4"]}
      py="1"
      data-testid="NotificationsNavTestId"
    >
      <IconButton
        aria-label="Ver notificações"
        icon={<RiNotificationLine />}
        fontSize="20"
      />
    </HStack>
  );
};
