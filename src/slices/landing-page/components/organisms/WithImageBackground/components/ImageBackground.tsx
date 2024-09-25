import { Box, Flex, Img } from "@/shared/ui";

export const ImageBackground = () => {
  return (
    <Flex
      id="image-wrapper"
      position="absolute"
      insetX="0"
      insetY="0"
      w="full"
      h="full"
      overflow="hidden"
      align="center"
    >
      <Box position="relative" w="full" h="full">
        <Img
          alt="Main image"
          w="full"
          h="full"
          objectFit={"cover"}
          objectPosition={"top bottom"}
          position="absolute"
          src="https://images.unsplash.com/photo-1590650153855-d9e808231d41?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80"
        />
        <Box position="absolute" w="full" h="full" bg="blackAlpha.600" />
      </Box>
    </Flex>
  );
};
