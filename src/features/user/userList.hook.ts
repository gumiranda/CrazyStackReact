import { UserProps } from "entidades/user";
import { UserProps, GetUsersResponse, getUsers } from "entidades/user";
import { useState, useEffect } from "react";
export type UserFormProps = {
  userList: GetUsersResponse;
  currentUser?: UserProps;
};

export const useUsersSelect = ({ userList, currentUser }: UserFormProps) => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<UserProps[]>(userList?.users);
  const [userSelected, setUserSelected] = useState<string | undefined>(
    currentUser?.userId ?? userList?.users?.[0]?._id ?? ""
  );
  const handleChangeUserSelected = (event: any): void => {
    event.preventDefault();
    setUserSelected(event.target.value);
  };
  const fetchUsersPaginated = async () => {
    if (userList?.totalCount > users?.length && page > 1) {
      const data = await getUsers(page, null);
      if (data?.totalCount > users?.length) {
        setUsers((prev) => [...prev, ...(data?.users ?? [])]);
      }
      setUserSelected(
        data?.users?.[0]?._id ?? users?.[0]?._id ?? currentUser?.userId ?? ""
      );
    } else {
      setUserSelected(users?.[0]?._id ?? currentUser?.userId ?? "");
    }
  };
  useEffect(() => {
    setUsers(userList?.users);
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
