import { getCategorys, getInfiniteCategorys } from "./category.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetCategorys = (
  page: number,
  options?: UseQueryOptions,
  ctx?: any
): any => {
  return useQuery({
    queryKey: ["categorys", page],
    queryFn: () => getCategorys(page, ctx),
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteCategorys = (
  options: Omit<UseInfiniteQueryOptions, "queryKey">
) => {
  return useInfiniteQuery({
    queryKey: ["categorysInfinite"],
    queryFn: ({ pageParam = 1 }: any) => getInfiniteCategorys(pageParam),
    ...options,
  });
};
