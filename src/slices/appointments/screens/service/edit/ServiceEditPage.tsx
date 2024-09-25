"use client";

import { Box, Head } from "@/shared/ui";
import { EditServiceForm } from "@/slices/appointments/features/service/edit";
import { ServiceProps } from "@/slices/appointments/entidades/service";
import { GetCategorysResponse } from "@/slices/appointments/entidades/category";
type ServiceEditProps = {
  data: ServiceProps;
  categorys: GetCategorysResponse;
  id: string;
};
export const ServiceEditPage = ({ data, id, categorys }: ServiceEditProps) => {
  const props = { service: data, categoryList: categorys };
  return (
    <>
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <EditServiceForm {...props} />
      </Box>
    </>
  );
};
