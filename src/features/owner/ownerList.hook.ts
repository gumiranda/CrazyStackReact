import { GetOwnersResponse, getOwners } from "entidades/owner";
import { UserProps } from "entidades/user";
import { useState, useEffect } from "react";
export type UserFormProps = {
  ownerList: GetOwnersResponse;
  currentUser?: UserProps;
};
export const useOwnersSelect = ({ ownerList, currentUser }: UserFormProps) => {
  const [page, setPage] = useState(1);
  const [owners, setOwners] = useState(ownerList?.owners ?? []);
  const [ownerSelected, setOwnerSelected] = useState<string>(
    //currentUser?.ownersId ??
    ownerList?.owners?.[0]?._id ?? ""
  );
  const handleChangeOwnerSelected = (event: any) => {
    event.preventDefault();
    setOwnerSelected(event.target.value);
  };
  const fetchOwnersPaginated = async () => {
    if (ownerList?.totalCount > owners?.length && page > 1) {
      const data = await getOwners(page, null);
      if (data?.totalCount > owners?.length) {
        setOwners((prev) => [...prev, ...(data.owners ?? [])]);
      }
      setOwnerSelected(
        data?.owners?.[0]?._id ?? owners?.[0]?._id ?? ownerList?.owners?.[0]?._id ?? ""
      );
    } else {
      setOwnerSelected(owners?.[0]?._id ?? ownerList?.owners?.[0]?._id ?? "");
    }
  };
  useEffect(() => {
    setOwners(ownerList?.owners ?? []);
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
