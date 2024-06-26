"use client";
import { Box, Head } from "@/shared/ui";
import { EditRequestForm } from "@/features/request/edit";
import { RequestProps } from "@/entidades/request";
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
