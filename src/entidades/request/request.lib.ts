import { getRequests, getInfiniteRequests } from "./request.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetRequests = (
  page: number,
  options?: UseQueryOptions,
  ctx?: any
): any => {
  return useQuery({
    queryKey: ["requests", page],
    queryFn: () => getRequests(page, ctx),
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteRequests = (
  options: Omit<UseInfiniteQueryOptions, "queryKey">,
  params?: any
) => {
  return useInfiniteQuery({
    queryKey: ["requestsInfinite", params],
    queryFn: ({ pageParam = 1, queryKey }: any) => {
      return getInfiniteRequests(pageParam, queryKey?.[1]);
    },
    ...options,
  });
};
