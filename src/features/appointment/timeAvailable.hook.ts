import { getTimeAvailables } from "entidades/appointment";
import { useState, useEffect } from "react";
import {
  toDate as toDateDateFns,
  // parseISO as parseISODateFns,
  // formatISO as formatISODateFns,
} from "date-fns";
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
  const { date } = params;
  const [timeAvailable, setTimeAvailable] = useState<any>(null);
  const [timeSelected, setTimeSelected] = useState<any>(
    timeAvailable?.timeAvailable?.[0]?.value
  );
  useEffect(() => {
    if (date) {
      fetchTimeAvailables(date);
    }
  }, [date]);
  const fetchTimeAvailables = async (newdate: any) => {
    const newdateArr = newdate?.split?.("/") ?? [1, 1, 2001];
    console.log({ newdateArr });
    const dateCloned = cloneDate(
      new Date(newdateArr?.[2], newdateArr?.[1] - 1, newdateArr?.[0])
    );
    const data = await getTimeAvailables({ ...params, date: dateCloned }, null);
    setTimeAvailable(data as any);
  };
  const handleChangeTimeSelected = (event: any) => {
    event.preventDefault();
    setTimeSelected(event.target.value);
  };
  return {
    timeAvailable,
    timeSelected,
    handleChangeTimeSelected,
  };
};
