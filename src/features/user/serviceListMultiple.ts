import { OptionBase } from "chakra-react-select";
import { GetServicesResponse } from "entidades/service";
import { useServicesSelect } from "features/service/serviceList.hook";
import { useEffect, useState } from "react";

export interface ServiceOptions extends OptionBase {
  label: string;
  value: string;
}

type ServiceListMultipleProps = {
  serviceList: GetServicesResponse;
  prevServicesSelected?: string[];
};

export const useServiceListMultiple = ({
  serviceList,
  prevServicesSelected = [],
}: ServiceListMultipleProps) => {
  const { services, setServiceSelected, serviceSelected } = useServicesSelect({
    serviceList,
  });
  const [prevServiceOptions, setPrevServiceOptions] = useState<ServiceOptions[]>(
    services
      ?.filter?.((service) => prevServicesSelected?.includes?.(service?._id))
      ?.map?.((service) => ({ label: service?.name, value: service?._id })) ?? []
  );
  const serviceOptions =
    services
      ?.filter?.((service) => !prevServicesSelected?.includes?.(service?._id))
      ?.map?.((service) => ({ label: service?.name, value: service?._id })) ?? [];
  useEffect(() => {
    if (services?.length < serviceList?.totalCount) {
      setServiceSelected("loadMore");
    }
  }, [serviceList?.totalCount, serviceSelected]);
  useEffect(() => {
    if (prevServicesSelected?.length > 0) {
      setPrevServiceOptions(
        services
          ?.filter?.((service) => prevServicesSelected?.includes?.(service?._id))
          ?.map?.((service) => ({ label: service?.name, value: service?._id })) ?? []
      );
    }
  }, [services]);
  return { serviceOptions, services, prevServiceOptions };
};
