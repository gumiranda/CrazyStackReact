import { getUsers, getInfiniteUsers, getUserById } from "./user.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetUsers = (page: number, options?: UseQueryOptions, ctx?: any): any => {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers(page, ctx),
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteUsers = (
  options: Omit<UseInfiniteQueryOptions, "queryKey">
) => {
  return useInfiniteQuery({
    queryKey: ["usersInfinite"],
    queryFn: ({ pageParam = 1 }: any) => getInfiniteUsers(pageParam),
    ...options,
  });
};
export const useGetUserById = (id, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id, null),
    ...options,
  });
};
