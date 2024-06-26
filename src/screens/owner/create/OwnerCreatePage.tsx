"use client";
import { Box, Head } from "@/shared/ui";
import { CreateOwnerForm } from "@/features/owner/create";

export const OwnerCreatePage = ({ data }) => {
  return (
    <>
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <CreateOwnerForm data={data} />
      </Box>
    </>
  );
};
