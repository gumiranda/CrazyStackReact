import { config } from "@/application/config";
import { getRequests } from "@/entidades/request";
import { useRequestInfiniteList } from "@/entidades/request/requestInfiniteList.hook";
import { useAuth } from "@/shared/libs";
import { useInfiniteFullList } from "@/shared/libs/hooks/useInfiniteFullList.hook";
import { calculateDateRange } from "@/shared/libs/utils/dateFunctions";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useHome = () => {
  const { t } = useTranslation(["PAGES"]);
  const { user = null } = useAuth() || {};
  const welcomeTitle = t("PAGES:HOME_PAGE.title", {
    defaultValue: `Olá, ${user?.name || "dev doido"}!`,
    user: user?.name,
  });
  const description = t("PAGES:HOME_PAGE.description", {
    defaultValue: "Bem-vindo ao",
    systemName: config?.systemName,
  });
  const {
    isFetching,
    requestList,
    fetchNextPage,
    hasNextPage,
    selectedDate,
    setSelectedDate,
    setEndDate,
  } = useRequestInfiniteList();
  useInfiniteFullList({ fetchNextPage, hasNextPage, isFetching });

  const [selectedDay, setSelectedDay] = useState<any>(new Date().getDay() - 1);
  const [selectedRange, setSelectedRange] = useState<any>("month");
  const [result, setResult] = useState<any>(null);

  const handleDayClick = ({ dayIndex, extraDiff }: DayClick) => {
    const diff = dayIndex - selectedDay + extraDiff;
    setSelectedDay(selectedDay === dayIndex ? null : dayIndex);
    setSelectedDate((prev) => addDays(prev, diff));
    setEndDate((prev) => addDays(prev, diff));
  };
  const selectedDayFormatted = new Date(selectedDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
  const dayFormatted = new Date(selectedDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
  });
  useEffect(() => {
    async function getRequestTotal() {
      const { initDate, endDate } = calculateDateRange(selectedRange);
      const result = await getRequests(1, null, { initDate, endDate });
      setResult(result);
    }
    getRequestTotal();
  }, [selectedRange]);

  return {
    welcomeTitle,
    selectedDay,
    handleDayClick,
    requestList,
    selectedDate,
    selectedDayFormatted,
    dayFormatted,
    selectedRange,
    setSelectedRange,
    result,
    description,
  };
};
export type DayClick = {
  dayIndex: number;
  extraDiff: number;
};
