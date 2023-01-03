import { getUsers, getInfiniteUsers } from "./user.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetUsers = (
  page: number,
  options?: UseQueryOptions,
  ctx?: any
): any => {
  return useQuery(["users", page], () => getUsers(page, ctx), {
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteUsers = (options?: UseInfiniteQueryOptions) => {
  return useInfiniteQuery(
    ["usersInfinite"],
    getInfiniteUsers as any,
    options as any
  );
};
