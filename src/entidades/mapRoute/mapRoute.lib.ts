import { getMapRoutes, getInfiniteMapRoutes } from "./mapRoute.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import type { DirectionsResponseData } from "@googlemaps/google-maps-services-js";

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

export type Route = {
  id: string;
  name: string;
  source: { name: string; location: { lat: number; lng: number } };
  destination: { name: string; location: { lat: number; lng: number } };
  distance: number;
  duration: number;
  directions: DirectionsResponseData & { request: any };
  created_at: Date;
  updated_at: Date;
};
