import { getRequests } from "@/entidades/request";
import { useAuth } from "@/shared/libs";
import { calculateDateRange } from "@/shared/libs/utils/dateFunctions";
import { useEffect, useState } from "react";
import { useRequestInfiniteList } from "@/entidades/request/requestInfiniteList.hook";
import { useInfiniteFullList } from "@/shared/libs/hooks/useInfiniteFullList.hook";

export const useLoadAppointmentsByPeriod = () => {
  const { user = null } = useAuth() || {};
  const [result, setResult] = useState<any>(null);
  const [selectedRange, setSelectedRange] = useState<any>("month");
  const {
    isFetching,
    requestList,
    fetchNextPage,
    hasNextPage,
    selectedDate,
    setSelectedDate,
    setEndDate,
    total,
    endDate,
  } = useRequestInfiniteList();
  const hasNextPageCorrect = total > requestList?.length && hasNextPage;
  useInfiniteFullList({ fetchNextPage, hasNextPage: hasNextPageCorrect, isFetching });
  useEffect(() => {
    async function getRequestTotal() {
      const { initDate, endDate } = calculateDateRange(selectedRange);
      setSelectedDate(initDate);
      setEndDate(endDate);
      const result = await getRequests(1, null, {
        initDate,
        endDate,
        createdById: user?._id,
      });
      setResult(result);
    }
    if (user?._id) {
      getRequestTotal();
    }
  }, [selectedRange, user?._id]);

  const totalAppointments = result?.totalCount;

  return {
    result,
    selectedRange,
    setSelectedRange,
    totalAppointments,
    requestList,
    selectedDate,
    endDate,
    isFetching,
    hasNextPage: hasNextPageCorrect,
  };
};
