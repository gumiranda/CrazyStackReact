"use client";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileIcon } from "lucide-react";
import { FileUpload } from "@ark-ui/react";
import { Box, Button, Flex, Spinner, VStack, Text } from "@/shared/ui";
import { parseCookies } from "nookies";
import { toaster } from "@/components/ui/toaster";
import { Tooltip } from "@/components/ui/tooltip";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";

export const PhotoUpload = ({ userId, updateUserPhoto }) => {
  const router = useRouter();
  const [filesAccepted, setFilesAccepted] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const { open, onOpen, onClose } = useDisclosure();
  const validateFile = (file) => {
    const errors: any = [];
    if (file.size > 5000000) {
      errors.push("File size exceeds them maximum limit of 5MB");
    }
    return errors.length ? errors : null;
  };
  const handleFileAccept = (details) => {
    setFilesAccepted(details.files);
    toaster.create({
      title: "File accepted.",
      description: "Your file has been accepted.",
      // status: "success",
      duration: 3000,
      // isClosable: true,
    });
  };
  const handleFileChange = (details) => {
    console.log("File changed:", details);
  };

  const handleFileReject = (details) => {};
  const uploadFiles = async (files) => {
    setIsUploading(true);
    const cookies = parseCookies();
    const formData = new FormData();
    formData.append("file", files[0]);
    try {
      const response = await uploadFilesApi({ formData, cookies });
      if (response.ok) {
        const data = await response.json();
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/update?_id=${userId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookies["belezixadmin.token"]}`,
            },
            body: JSON.stringify({ photoId: data._id }),
          }
        );
        if (result.ok) {
          toaster.create({
            title: "Upload successful.",
            description: "Your file has been uploaded.",
            // status: "success",
            duration: 3000,
            // isClosable: true,
          });
          setIsUploading(false);
          onClose();
          updateUserPhoto({ url: data.url });
          router.refresh();
          return;
        }
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
      onClose();
    }
  };
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
            content="Clique aqui para trocar a foto de perfil"
            aria-label="Trocar foto de perfil"
          >
            <FileUpload.Trigger asChild>
              <Button
                id="file-upload-trigger"
                colorPalette="primary"
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
              content="Clique para confirmar o upload da nova foto"
              aria-label="Confirmar foto"
            >
              <Button
                id="file-upload-trigger"
                colorPalette="tertiary"
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
          <VStack id="file-upload-item-group" gap={4} mt={4}>
            <FileUpload.Context>
              {({ acceptedFiles }) =>
                acceptedFiles.map((file) => (
                  <FileUpload.Item asChild key={file.name} file={file}>
                    <Flex
                      p={4}
                      borderRadius="md"
                      width={{ base: "100%", md: "50%" }}
                      alignItems="center"
                      justifyContent="space-between"
                      boxShadow="sm"
                      _hover={{ boxShadow: "md", borderColor: "gray.300" }}
                      _focus={{ boxShadow: "outline", borderColor: "primary.500" }}
                    >
                      <Flex alignItems="center" flexDir="column">
                        <Box mb={5}>
                          <Flex>
                            <FileUpload.ItemPreview type="image/*">
                              <FileUpload.ItemPreviewImage
                                alt={`Preview of ${file.name}`}
                              />
                            </FileUpload.ItemPreview>
                            <Tooltip
                              content="Remover arquivo"
                              aria-label="Remover arquivo"
                            >
                              <FileUpload.ItemDeleteTrigger asChild>
                                <Button
                                  id={`file-upload-item-delete-trigger-${file.name}`}
                                  colorPalette="red"
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
          <Tooltip
            content="Arraste o arquivo aqui ou clique para fazer upload"
            aria-label="Área de dropzone"
          >
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
          </Tooltip>
        </FileUpload.Dropzone>
        <FileUpload.HiddenInput asChild>
          <input id="file-upload-hidden-input" type="file" />
        </FileUpload.HiddenInput>
      </FileUpload.Root>
      <DialogRoot open={open}>
        <DialogContent>
          <DialogHeader color="gray.700">Confirmar Upload</DialogHeader>
          <DialogCloseTrigger color="gray.700" />
          <DialogBody color="gray.700">
            Tem certeza que deseja fazer o upload desse arquivo?
          </DialogBody>
          <DialogFooter>
            <Button colorPalette="gray" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorPalette="green" onClick={() => uploadFiles(filesAccepted)}>
              {isUploading ? <Spinner size="sm" /> : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  );
};
export const uploadFilesApi = async ({ formData, cookies }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploadPhoto`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cookies["belezixadmin.token"]}`,
    },
    body: formData,
  });
  return response;
};
