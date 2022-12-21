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
  return useQuery(["categorys", page], () => getCategorys(page, ctx), {
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteCategorys = (options?: UseInfiniteQueryOptions) => {
  return useInfiniteQuery(
    ["categorysInfinite"],
    getInfiniteCategorys as any,
    options as any
  );
};
