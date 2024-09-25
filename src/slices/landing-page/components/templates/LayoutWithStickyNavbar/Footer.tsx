import { config } from "@/application/config";
import { Box, Flex, Text, ChakraLink, Image } from "@/shared/ui";

export const Footer = () => {
  return (
    <Box as="footer" py="6" w="full" display="flex" alignItems="center" flexDir="column">
      <StoreApps />
      <Flex mt={10} px={{ base: 4, md: 6 }} flexDirection={{ base: "column", sm: "row" }}>
        <Text fontSize="lg" color="gray.300">
          {`© ${new Date().getFullYear()} ${config.systemName} . Todos os direitos reservados.`}
        </Text>
        <Flex ml={{ sm: 4 }}>
          <CustomLink href={"/"}>Termos de serviço</CustomLink>
          <CustomLink href={"/"}>Política de Privacidade</CustomLink>
          <CustomLink href={"/"}>Contato</CustomLink>
        </Flex>
      </Flex>
    </Box>
  );
};
const CustomLink = ({ href, children }) => {
  return (
    <ChakraLink
      mx={15}
      href={href}
      fontSize={"lg"}
      _hover={{ textDecoration: "underline", textDecorationThickness: "2px" }}
    >
      {children}
    </ChakraLink>
  );
};
const StoreApps = () => {
  return (
    <Box textAlign={"center"}>
      <Text fontWeight={"bold"} pb={4} color="primary.500">
        Baixe o app
      </Text>
      <Flex justifyContent="center" pb={{ base: 24, lg: 0 }}>
        <Image
          src="App Store.svg"
          h={12}
          pr={12}
          transition="all 0.3s ease-in-out"
          _hover={{ transform: "scale(1.25)" }}
        />
        <Image
          src="Play Store.svg"
          h={12}
          transition="all 0.3s ease-in-out"
          _hover={{ transform: "scale(1.25)" }}
        />
      </Flex>
    </Box>
  );
};
