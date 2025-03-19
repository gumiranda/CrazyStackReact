import { getPlaces, getInfinitePlaces } from "./place.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetPlaces = (page: number, options?: UseQueryOptions, ctx?: any): any => {
  return useQuery({
    queryKey: ["places", page],
    queryFn: () => getPlaces(page, ctx),
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfinitePlaces = (
  options: Omit<UseInfiniteQueryOptions, "queryKey">
) => {
  return useInfiniteQuery({
    queryKey: ["placesInfinite"],
    queryFn: ({ pageParam = 1 }: any) => getInfinitePlaces(pageParam),
    ...options,
  });
};
