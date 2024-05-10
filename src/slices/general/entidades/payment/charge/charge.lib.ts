import { getCharges, getInfiniteCharges } from "./charge.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetCharges = (
  page: number,
  options?: UseQueryOptions,
  ctx?: any
): any => {
  return useQuery({
    queryKey: ["charges", page],
    queryFn: () => getCharges(page, ctx),
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteCharges = (
  options: Omit<UseInfiniteQueryOptions, "queryKey">
) => {
  return useInfiniteQuery({
    queryKey: ["chargesInfinite"],
    queryFn: ({ pageParam = 1 }: any) => getInfiniteCharges(pageParam),
    ...options,
  });
};
