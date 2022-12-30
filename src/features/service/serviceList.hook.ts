import { GetServicesResponse, getServices, ServiceProps } from "entidades/service";
import { UserProps } from "entidades/user";
import { useState, useEffect } from "react";
export type ServiceFormProps = {
  serviceList?: GetServicesResponse | null;
  currentService?: ServiceProps;
  currentUser?: UserProps;
  ownerSelected?: string | null;
};
export const useServicesSelect = ({
  serviceList = null,
  currentService,
  currentUser,
  ownerSelected = null,
}: ServiceFormProps) => {
  const [page, setPage] = useState(1);
  const [services, setServices] = useState(serviceList?.services ?? []);
  const [serviceSelected, setServiceSelected] = useState<string>(
    //currentService?.servicesId ??
    services?.find?.((service) => currentUser?.serviceIds?.includes(service._id))?._id ??
      serviceList?.services?.[0]?._id ??
      ""
  );
  const handleChangeServiceSelected = (event: any) => {
    event.preventDefault();
    setServiceSelected(event.target.value);
  };
  const fetchServicesPaginated = async () => {
    if (serviceList && serviceList?.totalCount > services?.length && page > 1) {
      const params = {};
      if (ownerSelected) {
        Object.assign(params, { createdById: ownerSelected });
      }
      const data = await getServices(page, null, params);
      if (data?.totalCount > services?.length) {
        setServiceSelected(data?.services?.[0]?._id ?? "");
        setServices((prev) => [...prev, ...(data.services ?? [])]);
      }
    } else if (!serviceList && ownerSelected) {
      const data = await getServices(page, null, {
        createdById: ownerSelected,
      });
      if (data?.totalCount > services?.length) {
        setServiceSelected(data?.services?.[0]?._id ?? "");
        setServices((prev) => [...prev, ...(data.services ?? [])]);
      }
    }
  };
  useEffect(() => {
    setServices(serviceList?.services ?? []);
  }, [serviceList?.services]);
  useEffect(() => {
    if (serviceSelected === "loadMore") {
      setPage((prev) => prev + 1);
    }
  }, [serviceSelected]);
  useEffect(() => {
    fetchServicesPaginated();
  }, [page]);
  return {
    serviceSelected,
    setServiceSelected,
    handleChangeServiceSelected,
    services,
  };
};
