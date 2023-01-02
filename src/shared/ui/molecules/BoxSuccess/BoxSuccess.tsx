import { CheckCircleIcon } from "@chakra-ui/icons";
import { Heading } from "@chakra-ui/react";
import { Text, Box } from "shared/ui/atoms";
type BoxSuccessProps = {
  title?: string;
  content: string;
  children?: React.ReactNode;
};
export const BoxSuccess = ({ title, content, children, ...rest }: BoxSuccessProps) => {
  return (
    <Box textAlign={"center"} py={4} px={2} {...rest} datatestid="BoxSuccessTestId">
      <CheckCircleIcon boxSize="50px" color="green.500" />
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
