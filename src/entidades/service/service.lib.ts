import { getServices, getInfiniteServices } from "./service.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetServices = (
  page: number,
  options?: UseQueryOptions,
  ctx?: any
): any => {
  return useQuery(["services", page], () => getServices(page, ctx), {
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteServices = (options?: UseInfiniteQueryOptions) => {
  return useInfiniteQuery(
    ["servicesInfinite"],
    getInfiniteServices as any,
    options as any
  );
};
