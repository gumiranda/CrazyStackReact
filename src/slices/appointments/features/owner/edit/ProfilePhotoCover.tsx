import { Avatar, Box, Button, Container, Icon, Input } from "@/shared/ui";
import { EditIcon } from "lucide-react";

export const ProfilePhotoCover = ({
  coverImage,
  handleCoverChange,
  profileImage,
  handleProfileChange,
}) => {
  return (
    <>
      <Container maxW="container.lg" py={8}>
        <Box
          position="relative"
          h="300px"
          bg={coverImage ? `url(${coverImage})` : "gray.100"}
          backgroundSize="cover"
          backgroundPosition="center"
          borderRadius="lg"
        >
          <Box position="absolute" bottom={4} left={4}>
            <Input
              type="file"
              accept="image/*"
              id="cover-upload"
              onChange={handleCoverChange}
              display="none"
              name="photo"
            />
            <label htmlFor="cover-upload">
              <Button
                as="span"
                leftIcon={<EditIcon />}
                colorScheme="gray"
                variant="solid"
                size="sm"
                onClick={() => {}}
              >
                Alterar Capa
              </Button>
            </label>
          </Box>

          <Box position="absolute" bottom="-75px" left="50%" transform="translateX(-50%)">
            <Box position="relative">
              <Avatar
                w="150px"
                h="150px"
                src={profileImage || undefined}
                border="4px solid white"
                boxShadow="md"
              />
              <Box position="absolute" bottom={0} right={0}>
                <Input
                  type="file"
                  accept="image/*"
                  id="profile-upload"
                  onChange={handleProfileChange}
                  display="none"
                  name={"profile-upload"}
                />
                <label htmlFor="profile-upload">
                  <Button
                    as="span"
                    borderRadius="full"
                    p={2}
                    bg="gray.600"
                    boxShadow="md"
                    _hover={{ bg: "gray.700" }}
                  >
                    <Icon as={EditIcon} />
                  </Button>
                </label>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};
