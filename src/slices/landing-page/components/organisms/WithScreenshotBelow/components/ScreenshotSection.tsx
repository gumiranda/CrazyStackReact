import { Box, ChakraLink, Circle, Img, VisuallyHidden } from "@/shared/ui";
import { FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box as any);
const MotionCircle = motion(Circle as any);

export const ScreenshotSection = () => {
  return (
    <ChakraLink href="https://youtube.com/devdoido">
      <MotionBox
        cursor="pointer"
        position="relative"
        rounded="lg"
        overflow="hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Img
          alt="Screenshot do sistema"
          src="https://res.cloudinary.com/chakra-ui-pro/image/upload/v1621085270/pro-website/app-screenshot-light_kit2sp.png"
        />
        <MotionCircle
          size="20"
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
        </MotionCircle>
      </MotionBox>
    </ChakraLink>
  );
};
