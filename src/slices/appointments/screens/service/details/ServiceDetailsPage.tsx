"use client";

import { Box, Head } from "@/shared/ui";
import { ServiceDetails } from "@/slices/appointments/entidades/service/details";
import { ServiceProps } from "@/slices/appointments/entidades/service";
type ServiceDetailsProps = {
  data: ServiceProps;
  id: string;
};
export const ServiceDetailsPage = ({ data }: ServiceDetailsProps) => {
  const props = { service: data };
  return (
    <>
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <ServiceDetails {...props} />
      </Box>
    </>
  );
};
