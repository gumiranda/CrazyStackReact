import { useInfiniteFullList } from "@/shared/libs/hooks/useInfiniteFullList.hook";
import { useChargeInfiniteList } from "./chargeInfiniteList.hook";

export const useChargeList = () => {
  const { isFetching, chargeList, fetchNextPage, hasNextPage } = useChargeInfiniteList();
  useInfiniteFullList({ fetchNextPage, hasNextPage, isFetching });
  return { chargeList, isFetching };
};
