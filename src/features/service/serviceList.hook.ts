import { GetServicesResponse, getServices } from "entidades/service";
import { UserProps } from "entidades/user";
import { useState, useEffect } from "react";
export type UserFormProps = {
  serviceList: GetServicesResponse;
  currentUser?: UserProps;
};
export const useServicesSelect = ({ serviceList, currentUser }: UserFormProps) => {
  const [page, setPage] = useState(1);
  const [services, setServices] = useState(serviceList?.services ?? []);
  const [serviceSelected, setServiceSelected] = useState<string>(
    //currentUser?.servicesId ??
    serviceList?.services?.[0]?._id ?? ""
  );
  const handleChangeServiceSelected = (event: any) => {
    event.preventDefault();
    setServiceSelected(event.target.value);
  };
  const fetchServicesPaginated = async () => {
    if (serviceList?.totalCount > services?.length && page > 1) {
      const data = await getServices(page, null);
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
