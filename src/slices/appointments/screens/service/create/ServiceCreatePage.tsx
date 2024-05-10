"use client";

import { Box } from "@/shared/ui";
import { CreateServiceForm } from "@/slices/appointments/features/service/create";
import { GetCategorysResponse } from "@/slices/appointments/entidades/category";
type ServiceCreatePageProps = {
  data: GetCategorysResponse;
};
export const ServiceCreatePage = ({ data }: ServiceCreatePageProps) => {
  return (
    <>
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <CreateServiceForm categoryList={data} />
      </Box>
    </>
  );
};
