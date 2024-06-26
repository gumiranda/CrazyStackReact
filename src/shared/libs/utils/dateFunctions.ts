import { addDays, endOfDay, startOfDay, subDays } from "date-fns";

export const calculateDateRange = (range) => {
  let initDate, endDate;
  switch (range) {
    case "month":
      initDate = startOfDay(subDays(new Date(), 30));
      endDate = endOfDay(new Date());
      break;
    case "week":
      initDate = startOfDay(subDays(new Date(), 7));
      endDate = endOfDay(new Date());
      break;
    case "yesterday":
      initDate = startOfDay(subDays(new Date(), 1));
      endDate = endOfDay(new Date());
      break;
    case "today":
      initDate = startOfDay(new Date());
      endDate = endOfDay(new Date());
      break;
    case "tomorrow":
      initDate = startOfDay(addDays(new Date(), 1));
      endDate = endOfDay(addDays(new Date(), 1));
      break;
    default:
      initDate = startOfDay(subDays(new Date(), 30));
      endDate = endOfDay(new Date());
      break;
  }
  return { initDate, endDate };
};
