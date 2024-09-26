import { motion } from "framer-motion";
import { Heading, Text, VStack } from "@/shared/ui";

const MotionVStack = motion(VStack as any);

export const FeatureItem = ({ icon, title, description, color = "gray.700" }) => {
  return (
    <MotionVStack
      spacing={4}
      p={5}
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      textAlign="center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {icon}
      <Heading color={color} size="md">
        {title}
      </Heading>
      <Text color={color} fontSize={18}>
        {description}
      </Text>
    </MotionVStack>
  );
};
