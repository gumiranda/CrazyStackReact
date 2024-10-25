"use client";

import { Avatar, Box, Button, Container, List, ListItem, Text } from "@/shared/ui";

export const ProfileCard = ({ children, userData, handleOnClickButton }) => {
  return (
    <Box
      textAlign="center"
      mb="8"
      p="6"
      borderRadius="md"
      boxShadow="md"
      mx="auto"
      maxW="sm"
      border="2px solid teal"
      transition="all 0.3s ease"
      bgColor="gray.800"
      _hover={{
        transform: "scale(1.05)",
        bgColor: "gray.700",
      }}
    >
      <Avatar
        size="xl"
        name={userData.name}
        bg="teal.500"
        color="white"
        src={userData?.photo?.url}
      />
      <Text fontSize="2xl" fontWeight="bold" mt="4" color="teal.400">
        {userData.name}
      </Text>
      <Text mt="2" color="gray.300">
        {userData.email}
      </Text>
      <Button
        mt="4"
        colorPalette="teal"
        bg="teal.600"
        _hover={{ bg: "teal.400" }}
        _active={{ bg: "teal.700" }}
        p="6"
        borderRadius="md"
        boxShadow="lg"
        width="full"
        onClick={handleOnClickButton}
      >
        Editar perfil
      </Button>
      {children}
      {userData?.serviceOptions?.length > 0 && (
        <Container mt="4" p="4" bg="gray.700" borderRadius="md">
          <List gap={2}>
            {userData?.serviceOptions?.map?.((item: any, index) => (
              <ListItem key={index} color="teal.300">
                {item?.label}
              </ListItem>
            ))}
          </List>
        </Container>
      )}
    </Box>
  );
};
