import { getTimeAvailables } from "@/slices/appointments/entidades/appointment";
import { useState, useEffect } from "react";
import { toDate as toDateDateFns } from "date-fns";
type Params = {
  ownerId: string;
  serviceId: string;
  professionalId: string;
  date: string | null;
};

export const cloneDate = (date: number | Date): Date => {
  return toDateDateFns(new Date(date));
};

export const useTimeAvailable = (params: Params) => {
  const { date, ownerId, serviceId, professionalId } = params;
  const [timeAvailable, setTimeAvailable] = useState<any>(null);
  const [timeSelected, setTimeSelected] = useState<any>(
    timeAvailable?.timeAvailable?.[0]?.value
  );
  useEffect(() => {
    if (
      date &&
      ownerId?.length === 24 &&
      serviceId?.length === 24 &&
      professionalId?.length === 24
    ) {
      fetchTimeAvailables(date);
    } else if (timeAvailable?.timeAvailable?.length > 0) {
      setTimeAvailable(null);
    }
  }, [date, ownerId, serviceId, professionalId]);
  const fetchTimeAvailables = async (newdate: any) => {
    try {
      const newdateArr = newdate?.split?.("/") ?? [1, 1, 2001];
      const dateCloned = cloneDate(
        new Date(newdateArr?.[2], newdateArr?.[1] - 1, newdateArr?.[0])
      );
      const data = await getTimeAvailables({ ...params, date: dateCloned }, null);
      setTimeAvailable(data as any);
    } catch (error) {
      setTimeAvailable(null);
    }
  };
  const handleChangeTimeSelected = (event: any) => {
    event.preventDefault();
    setTimeSelected(event.target.value);
  };
  return { timeAvailable, timeSelected, handleChangeTimeSelected };
};
