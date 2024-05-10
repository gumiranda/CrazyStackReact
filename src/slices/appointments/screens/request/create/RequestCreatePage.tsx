"use client";
import { Box, Head } from "@/shared/ui";
import { CreateRequestForm } from "@/slices/appointments/features/request/create";
import { GetOwnersResponse } from "@/slices/appointments/entidades/owner";

type RequestCreatePageProps = {
  owners: GetOwnersResponse;
};
export const RequestCreatePage = ({ owners }: RequestCreatePageProps) => {
  return (
    <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
      <CreateRequestForm ownerList={owners} />
    </Box>
  );
};
