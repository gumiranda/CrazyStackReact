import { Heading, Icon } from "@chakra-ui/react";
import { Box, Flex, Text } from "@/shared/ui/atoms";
import { X } from "lucide-react";
type BoxErrorProps = {
  title?: string;
  content: string;
  children?: React.ReactNode;
};
export const BoxError = ({ title, content, children, ...rest }: BoxErrorProps) => {
  return (
    <Box textAlign={"center"} py={4} px={2} {...rest}>
      <Box display="inline-block">
        <Flex
          flexDir={"column"}
          justifyContent="center"
          alignItems={"center"}
          bg="red.500"
          rounded="50px"
          w="55px"
          h="55px"
          textAlign={"center"}
        >
          <Icon fontSize="20px" color="white">
            <X size="20px" color="white" />
          </Icon>
        </Flex>
      </Box>
      {title && (
        <Heading as="h2" size="xl" mt={6} mb={2} color="gray.500">
          {title}
        </Heading>
      )}

      <Text color="gray.500" mt={4}>
        {content}
      </Text>
      {children}
    </Box>
  );
};
