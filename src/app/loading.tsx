import { Spinner } from "@/shared/ui/atoms/Spinner";
import { Flex } from "@/shared/ui/atoms/Flex";

export default function Loading() {
  return (
    <Flex w="100vw" h="100vh" justify="center" align="center" bg="secondary.900">
      <Spinner size="xl" />
    </Flex>
  );
}
