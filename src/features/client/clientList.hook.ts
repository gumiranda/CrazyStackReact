import { ClientProps } from "entidades/client";
import { ClientProps, GetClientsResponse, getClients } from "entidades/client";
import { useState, useEffect } from "react";
export type ClientFormProps = {
  clientList: GetClientsResponse;
  currentClient?: ClientProps;
};

export const useClientsSelect = ({ clientList, currentClient }: ClientFormProps) => {
  const [page, setPage] = useState(1);
  const [clients, setClients] = useState<ClientProps[]>(clientList?.clients);
  const [clientSelected, setClientSelected] = useState<string | undefined>(
    currentClient?.clientId ?? clientList?.clients?.[0]?._id ?? ""
  );
  const handleChangeClientSelected = (event: any): void => {
    event.preventDefault();
    setClientSelected(event.target.value);
  };
  const fetchClientsPaginated = async () => {
    if (clientList?.totalCount > clients?.length && page > 1) {
      const data = await getClients(page, null);
      if (data?.totalCount > clients?.length) {
        setClients((prev) => [...prev, ...(data?.clients ?? [])]);
      }
      setClientSelected(
        data?.clients?.[0]?._id ?? clients?.[0]?._id ?? currentClient?.clientId ?? ""
      );
    } else {
      setClientSelected(clients?.[0]?._id ?? currentClient?.clientId ?? "");
    }
  };
  useEffect(() => {
    setClients(clientList?.clients);
  }, [clientList?.clients]);
  useEffect(() => {
    if (clientSelected === "loadMore") {
      setPage((prev) => prev + 1);
    }
  }, [clientSelected]);
  useEffect(() => {
    fetchClientsPaginated();
  }, [page]);
  return {
    clientSelected,
    setClientSelected,
    handleChangeClientSelected,
    clients,
  };
};
