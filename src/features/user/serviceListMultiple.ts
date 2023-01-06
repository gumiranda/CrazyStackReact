import { OptionBase } from "chakra-react-select";
import { GetServicesResponse } from "entidades/service";
import { useServicesSelect } from "features/service/serviceList.hook";
import { useEffect } from "react";
export interface ServiceOptions extends OptionBase {
  label: string;
  value: string;
}
type ServiceListMultipleProps = {
  serviceList: GetServicesResponse;
};
export const useServiceListMultiple = ({ serviceList }: ServiceListMultipleProps) => {
  const { services, setServiceSelected, serviceSelected } = useServicesSelect({
    serviceList,
  });
  const serviceOptions =
    services?.map?.((service: any) => ({
      label: service?.name,
      value: service?._id,
    })) ?? [];
  useEffect(() => {
    if (services?.length < serviceList?.totalCount) {
      setServiceSelected("loadMore");
    }
  }, [serviceList?.totalCount, serviceSelected]);
  return { serviceOptions };
};
