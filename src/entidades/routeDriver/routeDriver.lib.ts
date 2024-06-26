import { getRouteDrivers, getInfiniteRouteDrivers } from "./routeDriver.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetRouteDrivers = (
  page: number,
  options?: UseQueryOptions,
  ctx?: any
): any => {
  return useQuery({
    queryKey: ["routedrivers", page],
    queryFn: () => getRouteDrivers(page, ctx),
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteRouteDrivers = (
  options: Omit<UseInfiniteQueryOptions, "queryKey">
) => {
  return useInfiniteQuery({
    queryKey: ["routedriversInfinite"],
    queryFn: ({ pageParam = 1 }: any) => getInfiniteRouteDrivers(pageParam),
    ...options,
  });
};
