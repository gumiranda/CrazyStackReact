import {
  getSubscriptions,
  getInfiniteSubscriptions,
  getMySubscription,
} from "./subscription.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetSubscriptions = (
  page: number,
  options?: UseQueryOptions,
  ctx?: any
): any => {
  return useQuery({
    queryKey: ["subscriptions", page],
    queryFn: () => getSubscriptions(page, ctx),
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteSubscriptions = (
  options: Omit<UseInfiniteQueryOptions, "queryKey">
) => {
  return useInfiniteQuery({
    queryKey: ["subscriptionsInfinite"],
    queryFn: ({ pageParam = 1 }: any) => getInfiniteSubscriptions(pageParam),
    ...options,
  });
};
export const useGetSubscriptionById = (id, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ["subscription", id],
    queryFn: () => getMySubscription(id, null),
    ...options,
  });
};
