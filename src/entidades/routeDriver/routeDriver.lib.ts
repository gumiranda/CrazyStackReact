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
  return useQuery(["routeDrivers", page], () => getRouteDrivers(page, ctx), {
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteRouteDrivers = (options?: UseInfiniteQueryOptions) => {
  return useInfiniteQuery(
    ["routeDriversInfinite"],
    getInfiniteRouteDrivers as any,
    options as any
  );
};
