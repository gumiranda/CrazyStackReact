import { getRequests } from "@/entidades/request";
import { useAuth } from "@/shared/libs";
import { calculateDateRange } from "@/shared/libs/utils/dateFunctions";
import { useEffect, useState } from "react";

export const useLoadAppointmentsByPeriod = () => {
  const { user = null } = useAuth() || {};
  const [result, setResult] = useState<any>(null);
  const [selectedRange, setSelectedRange] = useState<any>("month");

  useEffect(() => {
    async function getRequestTotal() {
      const { initDate, endDate } = calculateDateRange(selectedRange);
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

  return { result, selectedRange, setSelectedRange, totalAppointments };
};
