import { getOwners, getInfiniteOwners } from "./owner.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetOwners = (page: number, options?: UseQueryOptions, ctx?: any): any => {
  return useQuery({
    queryKey: ["owners", page],
    queryFn: () => getOwners(page, ctx),
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteOwners = (
  options: Omit<UseInfiniteQueryOptions, "queryKey">
) => {
  return useInfiniteQuery({
    queryKey: ["ownersInfinite"],
    queryFn: ({ pageParam = 1 }: any) => getInfiniteOwners(pageParam),
    ...options,
  });
};
