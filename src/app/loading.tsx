import { Flex } from "@/shared/ui";

import { Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex w="100vw" h="100vh" justify="center" align="center" bg="secondary.900">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl" />
    </Flex>
  );
}
