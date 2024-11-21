import { UserProps } from "@/slices/general/entidades/user";
import {
  OwnerProps,
  GetOwnersResponse,
  getOwners,
} from "@/slices/appointments/entidades/owner";
import { useState, useEffect } from "react";
export type UserFormProps = {
  ownerList: GetOwnersResponse;
  currentUser?: UserProps;
};

export const useOwnersSelect = ({ ownerList, currentUser }: UserFormProps) => {
  const [page, setPage] = useState(1);
  const [owners, setOwners] = useState<OwnerProps[]>(ownerList?.owners);
  const [ownerSelected, setOwnerSelected] = useState<string | undefined>(
    currentUser?.ownerId ?? ownerList?.owners?.[0]?._id ?? ""
  );
  const handleChangeOwnerSelected = (event: any): void => {
    setOwnerSelected(event.target.value);
  };
  const fetchOwnersPaginated = async () => {
    if (ownerList?.totalCount > owners?.length && page > 1) {
      const data = await getOwners(page, null);
      if (data?.totalCount > owners?.length) {
        setOwners((prev) => [...prev, ...(data?.owners ?? [])]);
      }
      setOwnerSelected(
        data?.owners?.[0]?._id ?? owners?.[0]?._id ?? currentUser?.ownerId ?? ""
      );
    } else {
      setOwnerSelected(owners?.[0]?._id ?? currentUser?.ownerId ?? "");
    }
  };
  useEffect(() => {
    setOwners(ownerList?.owners);
  }, [ownerList?.owners]);
  useEffect(() => {
    if (ownerSelected === "loadMore") {
      setPage((prev) => prev + 1);
    }
  }, [ownerSelected]);
  useEffect(() => {
    fetchOwnersPaginated();
  }, [page]);
  return {
    ownerSelected,
    setOwnerSelected,
    handleChangeOwnerSelected,
    owners,
  };
};
