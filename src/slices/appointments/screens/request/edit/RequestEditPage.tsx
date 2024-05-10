"use client";
import { Box, Head } from "@/shared/ui";
import { EditRequestForm } from "@/slices/appointments/features/request/edit";
import { RequestProps } from "@/slices/appointments/entidades/request";
type RequestEditProps = {
  data: RequestProps;
  owners: any;
};
export const RequestEditPage = ({ data, owners }: RequestEditProps) => {
  const props = { request: data, owners };
  return (
    <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
      <EditRequestForm {...props} />
    </Box>
  );
};
