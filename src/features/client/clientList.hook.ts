import { GetClientsResponse, getClients, ClientProps } from "@/entidades/client";
import { useState, useEffect, useCallback } from "react";
export type ClientFormProps = {
  clientList?: GetClientsResponse | null;
  currentClient?: ClientProps;
  ownerSelected?: string | null;
};
export const useClientsSelect = ({
  clientList = null,
  currentClient,
  ownerSelected = null,
}: ClientFormProps) => {
  const [page, setPage] = useState(1);
  const [clients, setClients] = useState(clientList?.clients ?? []);
  const [clientSelected, setClientSelected] = useState<string>(
    //currentClient?._id ??
    clientList?.clients?.[0]?._id ?? ""
  );
  const handleChangeClientSelected = (event: any) => {
    event.preventDefault();
    setClientSelected(event.target.value);
  };
  const fetchClientsPaginated = useCallback(async () => {
    if (clientList && clientList?.totalCount > clients?.length && page > 1) {
      const params = {};
      if (ownerSelected) {
        Object.assign(params, { createdById: ownerSelected });
      }
      const data = await getClients(page, null, params);
      if (data?.totalCount > clients?.length) {
        setClients((prev) => {
          // Filter out duplicates based on _id
          const uniqueClients = [...prev, ...(data.clients ?? [])].filter(
            (client, index, self) => self.findIndex((c) => c._id === client._id) === index
          );
          return uniqueClients;
        });
      }
      setClientSelected(data?.clients?.[0]?._id ?? clients?.[0]?._id ?? "");
    } else if (!clientList && ownerSelected) {
      const data = await getClients(page, null, {
        createdById: ownerSelected,
      });
      if (data?.totalCount > clients?.length) {
        setClients((prev) => {
          // Filter out duplicates based on _id
          const uniqueClients = [...prev, ...(data.clients ?? [])].filter(
            (client, index, self) => self.findIndex((c) => c._id === client._id) === index
          );
          return uniqueClients;
        });
      }
      setClientSelected(data?.clients?.[0]?._id ?? clients?.[0]?._id ?? "");
    } else {
      setClientSelected(clients?.[0]?._id ?? "");
    }
  }, [clientList, clients, ownerSelected, page]);
  useEffect(() => {
    setClients(clientList?.clients ?? []);
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
