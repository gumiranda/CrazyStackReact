import { getClients, getInfiniteClients } from "./client.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetClients = (page: number, options?: UseQueryOptions, ctx?: any): any => {
  return useQuery(["clients", page], () => getClients(page, ctx), {
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteClients = (options?: UseInfiniteQueryOptions) => {
  return useInfiniteQuery(["clientsInfinite"], getInfiniteClients as any, options as any);
};
