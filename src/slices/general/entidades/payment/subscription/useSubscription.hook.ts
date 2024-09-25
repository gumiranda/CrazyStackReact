import { useInfiniteFullList } from "@/shared/libs/hooks/useInfiniteFullList.hook";
import { useSubscriptionInfiniteList } from "./subscriptionInfiniteList.hook";

export const useSubscriptionList = () => {
  const { isFetching, subscriptionList, fetchNextPage, hasNextPage } =
    useSubscriptionInfiniteList();
  useInfiniteFullList({ fetchNextPage, hasNextPage, isFetching });
  return { subscriptionList, isFetching };
};
