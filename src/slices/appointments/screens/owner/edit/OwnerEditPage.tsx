"use client";
import { Box } from "@/shared/ui";
import type { OwnerPlaceProps } from "@/slices/appointments/entidades/owner/owner.model";
import { EditOwnerForm } from "@/slices/appointments/features/owner/edit";
type OwnerEditProps = {
  data: OwnerPlaceProps;
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
