"use client";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileIcon } from "lucide-react";
import { FileUpload } from "@ark-ui/react";
import { Box, Button, Flex, VStack } from "@/shared/ui";

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
        <Flex>
          <FileUpload.Trigger asChild>
            <Button>Trocar foto do perfil</Button>
          </FileUpload.Trigger>
        </Flex>
        <FileUpload.ItemGroup asChild>
          <VStack></VStack>
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
