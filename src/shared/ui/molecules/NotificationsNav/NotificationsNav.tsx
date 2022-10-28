import { Icon, HStack } from "@chakra-ui/react";
import { RiNotificationLine } from "react-icons/ri";

export const NotificationsNav = () => {
  return (
    <HStack
      spacing={["3", "4"]}
      mx={["3", "4"]}
      pr={["3", "4"]}
      py="1"
      color="purple.300"
      borderRightWidth={1}
      borderColor="purple.700"
      data-testid="NotificationsNavTestId"
    >
      <Icon as={RiNotificationLine} fontSize="20" />
    </HStack>
  );
};
