import { GetUsersResponse, getUsers, UserProps } from "@/slices/general/entidades/user";
import { useState, useEffect, useCallback } from "react";
export type UserFormProps = {
  userList?: GetUsersResponse | null;
  currentUser?: UserProps;
  ownerSelected?: string | null;
  role?: string;
};
export const useUsersSelect = ({
  userList = null,
  currentUser,
  ownerSelected = null,
  role = "professional",
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
  const fetchUsersPaginated = useCallback(async () => {
    if (userList && userList?.totalCount > users?.length && page > 1) {
      const params = { role };
      if (ownerSelected) {
        Object.assign(params, { ownerId: ownerSelected });
      }
      const data = await getUsers(page, null, params);
      if (data?.totalCount > users?.length) {
        setUsers((prev) => {
          // Filter out duplicates based on _id
          const uniqueUsers = [...prev, ...(data?.users ?? [])].filter(
            (user, index, self) => self.findIndex((u) => u._id === user._id) === index
          );
          return uniqueUsers;
        });
      }
      setUserSelected(data?.users?.[0]?._id ?? users?.[0]?._id ?? "");
    } else if (!userList && ownerSelected) {
      const data = await getUsers(page, null, {
        ownerId: ownerSelected,
        role,
      });
      if (data?.totalCount > users?.length) {
        setUsers((prev) => {
          // Filter out duplicates based on _id
          const uniqueUsers = [...prev, ...(data?.users ?? [])].filter(
            (user, index, self) => self.findIndex((u) => u._id === user._id) === index
          );
          return uniqueUsers;
        });
      }
      setUserSelected(data?.users?.[0]?._id ?? users?.[0]?._id ?? "");
    } else {
      setUserSelected(users?.[0]?._id ?? "");
    }
  }, [userList, users, page, ownerSelected, role]);
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
  }, [fetchUsersPaginated, page]);
  return {
    userSelected,
    setUserSelected,
    handleChangeUserSelected,
    users,
  };
};
