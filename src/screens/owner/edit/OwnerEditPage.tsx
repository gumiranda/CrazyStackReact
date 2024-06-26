"use client";
import { Box, Head } from "@/shared/ui";
import { EditOwnerForm } from "@/features/owner/edit";
import { OwnerProps } from "@/entidades/owner";
type OwnerEditProps = {
  data: OwnerProps;
  id: string;
  users: any;
};
export const OwnerEditPage = ({ data, id, users }: OwnerEditProps) => {
  const props = { owner: data, id, users };
  return (
    <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
      <EditOwnerForm {...props} />
    </Box>
  );
};
