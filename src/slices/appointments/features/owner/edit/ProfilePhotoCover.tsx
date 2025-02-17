import { Avatar, Box, Button, Container, Icon, Input, Spinner } from "@/shared/ui";
import { EditIcon } from "lucide-react";
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { HiUpload } from "react-icons/hi";
import { useState } from "react";
import { toaster } from "@/components/ui/toaster";
import { parseCookies } from "nookies";
import { uploadFilesApi } from "@/slices/general/screens/user/details/PhotoUpload";

export const ProfilePhotoCover = ({
  coverImage,
  handleCoverChange,
  profileImage,
  handleProfileChange,
}) => {
  const [filesAccepted, setFilesAccepted] = useState([]);
  const [currentCoverImage, setCurrentCoverImage] = useState(coverImage);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileAccept = (details) => {
    setFilesAccepted(details.files);
    setCurrentCoverImage(URL.createObjectURL(details.files[0]));
    uploadFiles(details.files);
  };
  const uploadFiles = async (files) => {
    setIsUploading(true);
    const cookies = parseCookies();
    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const response = await uploadFilesApi({ formData, cookies });
      if (response.ok) {
        const data = await response.json();

        toaster.create({
          title: "Upload successful.",
          description: "Your file has been uploaded.",
          duration: 3000,
        });
        setIsUploading(false);
        return;
      }
      toaster.create({
        title: "Upload failed.",
        description: "There was an error uploading your file.",
        // status: "error",
        duration: 3000,
        // isClosable: true,
      });
    } catch (error) {
      toaster.create({
        title: "Upload failed.",
        description: "There was an error uploading your file.",
        // status: "error",
        duration: 3000,
        // isClosable: true,
      });
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <>
      <Container maxW="container.lg" py={8}>
        <Box
          position="relative"
          h="300px"
          bg={currentCoverImage ? `url(${currentCoverImage})` : "gray.100"}
          backgroundSize="cover"
          backgroundPosition="center"
          borderRadius="lg"
        >
          <Box position="absolute" bottom={4} left={4}>
            <FileUploadRoot
              accept="image/*"
              locale="pt-BR"
              maxFiles={1}
              maxFileSize={5000000}
              minFileSize={1024}
              name="coverImage"
              onFileAccept={handleFileAccept}
            >
              <FileUploadTrigger asChild>
                <Button>
                  {isUploading ? (
                    <Spinner size="sm" />
                  ) : (
                    <>
                      <EditIcon /> Alterar capa
                    </>
                  )}
                </Button>
              </FileUploadTrigger>
            </FileUploadRoot>
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
