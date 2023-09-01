import { getMapRoutes, getInfiniteMapRoutes } from "./mapRoute.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetMapRoutes = (
  page: number,
  options?: UseQueryOptions,
  ctx?: any
): any => {
  return useQuery(["mapRoutes", page], () => getMapRoutes(page, ctx), {
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteMapRoutes = (options?: UseInfiniteQueryOptions) => {
  return useInfiniteQuery(
    ["mapRoutesInfinite"],
    getInfiniteMapRoutes as any,
    options as any
  );
};
