"use client";
import { Tooltip, useDisclosure, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileIcon } from "lucide-react";
import { FileUpload } from "@ark-ui/react";
import { Box, Button, Flex, Spinner, VStack, Text } from "@/shared/ui";

export const PhotoUpload = ({ userId, updateUserPhoto }) => {
  const router = useRouter();
  const [filesAccepted, setFilesAccepted] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const validateFile = (file) => {
    const errors: any = [];
    if (file.size > 5000000) {
      errors.push("File size exceeds them maximum limit of 5MB");
    }
    return errors.length ? errors : null;
  };
  const handleFileAccept = (details) => {
    setFilesAccepted(details.files);
    toast({
      title: "File accepted.",
      description: "Your file has been accepted.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const handleFileChange = (details) => {
    console.log("File changed:", details);
  };

  const handleFileReject = (details) => {};
  const uploadFiles = async (files) => {};
  return (
    <>
      <FileUpload.Root
        accept="image/*"
        allowDrop={true}
        disabled={false}
        ids={{
          root: "file-upload-root",
          dropzone: "file-upload-dropzone",
          hiddenInput: "file-upload-hidden-input",
          trigger: "file-upload-trigger",
          label: "file-upload-label",
          item: (id) => `file-upload-item-${id}`,
          itemName: (id) => `file-upload-item-name-${id}`,
          itemSizeText: (id) => `file-upload-item-size-text-${id}`,
          itemPreview: (id) => `file-upload-item-preview-${id}`,
        }}
        locale="pt-BR"
        maxFiles={1}
        maxFileSize={5000000}
        minFileSize={1024}
        name="uploadedFiles"
        onFileAccept={handleFileAccept}
        onFileChange={handleFileChange}
        onFileReject={handleFileReject}
        validate={validateFile}
      >
        <Flex
          alignItems={{ base: "center", md: "flex-start" }}
          gap={{ base: 0, md: 8 }}
          flexDir={{ base: "column", md: "row" }}
        >
          <Tooltip
            label="Clique aqui para trocar a foto de perfil"
            aria-label="Trocar foto de perfil"
          >
            <FileUpload.Trigger asChild>
              <Button
                id="file-upload-trigger"
                colorScheme="primary"
                size="md"
                mt={{ base: 4, md: 8 }}
                mb={{ base: 0, md: 4 }}
                p={4}
                borderRadius="md"
                boxShadow="sm"
                _hover={{ boxShadow: "md", backgroundColor: "primary.600" }}
                _active={{ boxShadow: "lg", backgroundColor: "primary.700" }}
                _focus={{ boxShadow: "outline", borderColor: "primary.500" }}
              >
                Trocar foto do perfil
              </Button>
            </FileUpload.Trigger>
          </Tooltip>

          {filesAccepted?.length > 0 && (
            <Tooltip
              label="Clique para confirmar o upload da nova foto"
              aria-label="Confirmar foto"
            >
              <Button
                id="file-upload-trigger"
                colorScheme="tertiary"
                size="md"
                mt={{ base: 4, md: 8 }}
                mb={{ base: 0, md: 4 }}
                p={4}
                borderRadius="md"
                boxShadow="sm"
                _hover={{ boxShadow: "md", backgroundColor: "tertiary.500" }}
                _active={{ boxShadow: "lg", backgroundColor: "tertiary.300" }}
                _focus={{ boxShadow: "outline", borderColor: "tertiary.500" }}
                onClick={onOpen}
              >
                {isUploading ? <Spinner size="sm" /> : "Confirmar foto"}
              </Button>
            </Tooltip>
          )}
        </Flex>
        <FileUpload.ItemGroup asChild>
          <VStack id="file-upload-item-group" spacing={4} mt={4}>
            <FileUpload.Context>
              {({ acceptedFiles }) =>
                acceptedFiles.map((file) => (
                  <FileUpload.Item asChild key={file.name} file={file}>
                    <Flex>
                      <Flex>
                        <Box mb={5}>
                          <Flex>
                            <FileUpload.ItemPreview type="image/*">
                              <FileUpload.ItemPreviewImage
                                alt={`Preview of ${file.name}`}
                              />
                            </FileUpload.ItemPreview>

                            <Tooltip label="Remover arquivo" aria-label="Remover arquivo">
                              <FileUpload.ItemDeleteTrigger asChild>
                                <Button
                                  id={`file-upload-item-delete-trigger-${file.name}`}
                                  colorScheme="red"
                                  size="sm"
                                  ml={4}
                                  _focus={{
                                    boxShadow: "outline",
                                    borderColor: "red.500",
                                  }}
                                >
                                  X
                                </Button>
                              </FileUpload.ItemDeleteTrigger>
                            </Tooltip>
                          </Flex>
                          <Box mt={5}>
                            <FileUpload.ItemPreview type=".*">
                              <FileIcon
                                size={32}
                                aria-label={`Icon representing ${file.name}`}
                              />
                            </FileUpload.ItemPreview>

                            <Box>
                              <FileUpload.ItemName asChild>
                                <Text
                                  id={`file-upload-item-name-${file.name}`}
                                  fontWeight="bold"
                                  fontSize="md"
                                  my={4}
                                  _focus={{
                                    boxShadow: "outline",
                                    borderColor: "primary.500",
                                  }}
                                >
                                  {file.name}
                                </Text>
                              </FileUpload.ItemName>
                              <FileUpload.ItemSizeText asChild>
                                <Text
                                  id={`file-upload-item-size-text-${file.name}`}
                                  color="gray.500"
                                  fontSize="sm"
                                  _focus={{
                                    boxShadow: "outline",
                                    borderColor: "primary.500",
                                  }}
                                >
                                  {file.size} bytes
                                </Text>
                              </FileUpload.ItemSizeText>
                            </Box>
                          </Box>
                        </Box>
                      </Flex>
                    </Flex>
                  </FileUpload.Item>
                ))
              }
            </FileUpload.Context>
          </VStack>
        </FileUpload.ItemGroup>
        <FileUpload.Dropzone asChild>
          <Box
            id="file-upload-dropzone"
            borderWidth="2px"
            borderColor="gray.300"
            borderRadius="md"
            p={4}
            my={2}
            backgroundColor="gray.50"
            _hover={{ borderColor: "gray.400", backgroundColor: "gray.100" }}
            _focus={{ boxShadow: "outline", borderColor: "primary.500" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="100px"
            color="gray.700"
          >
            Arraste o arquivo aqui ou clique para fazer upload.
          </Box>
        </FileUpload.Dropzone>
        <FileUpload.HiddenInput asChild>
          <input id="file-upload-hidden-input" type="file" />
        </FileUpload.HiddenInput>
      </FileUpload.Root>
    </>
  );
};
