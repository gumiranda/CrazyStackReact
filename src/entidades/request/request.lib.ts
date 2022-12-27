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
  return useQuery(["requests", page], () => getRequests(page, ctx), {
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteRequests = (options?: UseInfiniteQueryOptions) => {
  return useInfiniteQuery(
    ["requestsInfinite"],
    getInfiniteRequests as any,
    options as any
  );
};
