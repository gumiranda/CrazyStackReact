import { Box, ChakraLink, Img, VisuallyHidden } from "@/shared/ui";
import { FaPlay } from "react-icons/fa";

export const ScreenshotSection = () => {
  return (
    <ChakraLink isExternal href="https://youtube.com/devdoido">
      <Box cursor="pointer" position="relative" rounded="lg" overflow="hidden">
        <Img
          alt="Screenshot do sistema"
          src="https://res.cloudinary.com/chakra-ui-pro/image/upload/v1621085270/pro-website/app-screenshot-light_kit2sp.png"
        />
        <Box
          borderRadius={"50%"}
          width="20"
          height="20"
          as="button"
          bg="white"
          shadow="lg"
          color="primary.500"
          top="50%"
          left="50%"
          fontSize="xl"
          position="absolute"
          transform="translate3d(-50%, -50%, 0)"
          transition="all 0.2s"
          _groupHover={{ transform: "translate3d(-50%,-50%,0 scale(1.05)" }}
        >
          <VisuallyHidden>Iniciar vídeo de demonstração</VisuallyHidden>
          <FaPlay />
        </Box>
      </Box>
    </ChakraLink>
  );
};
