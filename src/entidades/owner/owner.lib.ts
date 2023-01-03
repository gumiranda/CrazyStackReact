import { getOwners, getInfiniteOwners } from "./owner.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetOwners = (
  page: number,
  options?: UseQueryOptions,
  ctx?: any
): any => {
  return useQuery(["owners", page], () => getOwners(page, ctx), {
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteOwners = (options?: UseInfiniteQueryOptions) => {
  return useInfiniteQuery(
    ["ownersInfinite"],
    getInfiniteOwners as any,
    options as any
  );
};
