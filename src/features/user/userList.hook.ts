import { GetUsersResponse, getUsers, UserProps } from "entidades/user";
import { useState, useEffect } from "react";
export type UserFormProps = {
  userList?: GetUsersResponse | null;
  currentUser?: UserProps;
  ownerSelected?: string | null;
};
export const useUsersSelect = ({
  userList = null,
  currentUser,
  ownerSelected = null,
}: UserFormProps) => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState(userList?.users ?? []);
  const [userSelected, setUserSelected] = useState<string>(
    //currentUser?.usersId ??
    userList?.users?.[0]?._id ?? ""
  );
  const handleChangeUserSelected = (event: any) => {
    event.preventDefault();
    setUserSelected(event.target.value);
  };
  const fetchUsersPaginated = async () => {
    if (userList && userList?.totalCount > users?.length && page > 1) {
      const params = {};
      if (ownerSelected) {
        Object.assign(params, { ownerId: ownerSelected, role: "professional" });
      }
      const data = await getUsers(page, null, params);
      if (data?.totalCount > users?.length) {
        setUserSelected(data?.users?.[0]?._id ?? "");
        setUsers((prev) => [...prev, ...(data.users ?? [])]);
      }
    } else if (!userList && ownerSelected) {
      const data = await getUsers(page, null, {
        ownerId: ownerSelected,
        role: "professional",
      });
      if (data?.totalCount > users?.length) {
        setUserSelected(data?.users?.[0]?._id ?? "");
        setUsers((prev) => [...prev, ...(data.users ?? [])]);
      }
    }
  };
  useEffect(() => {
    setUsers(userList?.users ?? []);
  }, [userList?.users]);
  useEffect(() => {
    if (userSelected === "loadMore") {
      setPage((prev) => prev + 1);
    }
  }, [userSelected]);
  useEffect(() => {
    fetchUsersPaginated();
  }, [page]);
  return {
    userSelected,
    setUserSelected,
    handleChangeUserSelected,
    users,
  };
};
