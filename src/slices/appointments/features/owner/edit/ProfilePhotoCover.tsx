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
  const [currentCoverImage, setCurrentCoverImage] = useState(coverImage);
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadCover = (details) => {
    setCurrentCoverImage(URL.createObjectURL(details.files[0]));
    uploadFiles({ files: details?.files, typePhoto: "cover" });
  };
  const handleUploadProfile = (details) => {
    setCurrentProfileImage(URL.createObjectURL(details.files[0]));
    uploadFiles({ files: details?.files, typePhoto: "profile" });
  };
  const uploadFiles = async ({ files, typePhoto }) => {
    setIsUploading(true);
    const cookies = parseCookies();
    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const response = await uploadFilesApi({ formData, cookies });
      if (response.ok) {
        const data = await response.json();
        typePhoto === "cover" && handleCoverChange(data?._id);
        typePhoto === "profile" && handleProfileChange(data?._id);
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
          bg={currentCoverImage ? `url(${currentCoverImage})` : "gray.400"}
          backgroundSize="cover"
          bgColor="gray.400"
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
              onFileAccept={handleUploadCover}
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
                src={currentProfileImage || undefined}
                border="4px solid white"
                boxShadow="md"
              />
              <Box position="absolute" bottom={0} right={0}>
                <FileUploadRoot
                  accept="image/*"
                  locale="pt-BR"
                  maxFiles={1}
                  maxFileSize={5000000}
                  minFileSize={1024}
                  name="coverImage"
                  onFileAccept={handleUploadProfile}
                >
                  <FileUploadTrigger asChild>
                    <Button
                      as="span"
                      borderRadius="full"
                      p={2}
                      bg="gray.600"
                      boxShadow="md"
                      _hover={{ bg: "gray.700" }}
                    >
                      {isUploading ? (
                        <Spinner size="sm" />
                      ) : (
                        <>
                          <EditIcon />
                        </>
                      )}
                    </Button>
                  </FileUploadTrigger>
                </FileUploadRoot>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};
