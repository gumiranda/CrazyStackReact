import { getServices, getInfiniteServices, getServiceById } from "./service.api";
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
  return useQuery({
    queryKey: ["services", page],
    queryFn: () => getServices(page, ctx),
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteServices = (
  options: Omit<UseInfiniteQueryOptions, "queryKey">
) => {
  return useInfiniteQuery({
    queryKey: ["servicesInfinite"],
    queryFn: ({ pageParam = 1 }: any) => getInfiniteServices(pageParam),
    ...options,
  });
};
export const useGetServiceById = (id: string, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ["service", id],
    queryFn: () => getServiceById(id, null),
    ...options,
  });
};
