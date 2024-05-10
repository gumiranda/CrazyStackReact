import { getClientById, getClients, getInfiniteClients } from "./client.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetClients = (
  page: number,
  options?: UseQueryOptions,
  ctx?: any
): any => {
  return useQuery({
    queryKey: ["clients", page],
    queryFn: () => getClients(page, ctx),
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteClients = (
  options: Omit<UseInfiniteQueryOptions, "queryKey">
) => {
  return useInfiniteQuery({
    queryKey: ["clientsInfinite"],
    queryFn: ({ pageParam = 1 }: any) => getInfiniteClients(pageParam),
    ...options,
  });
};
export const useGetClientById = (id: string, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ["client", id],
    queryFn: () => getClientById(id, null),
    ...options,
  });
};
