/**
 *  Core
 */

export const daysMap = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];
export const monthMap = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const getDayDetails = (args: any) => {
  const date = args.index - args.firstDay;
  const day = args.index % 7;
  let prevMonth = args.month - 1;
  let prevYear = args.year;
  if (prevMonth < 0) {
    prevMonth = 11;
    prevYear--;
  }
  const prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
  const _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
  const month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
  const timestamp = new Date(args.year, args.month, _date).getTime();
  return {
    date: _date,
    day,
    month,
    timestamp,
    dayString: daysMap[day],
  };
};

export const getNumberOfDays = (year: number, month: number) => {
  return 40 - new Date(year, month, 40).getDate();
};

export const getMonthDetails = (year: number, month: number, rows: number) => {
  //
  const firstDay = new Date(year, month).getDay();
  const numberOfDays = getNumberOfDays(year, month);
  const monthArray: any = [];
  let currentDay: any = null;
  let index = 0;
  const cols = 7;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      currentDay = getDayDetails({
        index,
        numberOfDays,
        firstDay,
        year,
        month,
      }) as any;
      monthArray.push(currentDay);
      index++;
    }
  }
  const last = monthArray?.find?.(
    (day) => day?.date === numberOfDays && day?.month === 0
  );
  if (!last) {
    return getMonthDetails(year, month, rows + 1);
  }
  return monthArray;
};

export const getDateFromDateString = (dateValue: string) => {
  const dateData = dateValue.split("-").map((d) => parseInt(d, 10));
  if (dateData.length < 3) return null;

  const year = dateData[0];
  const month = dateData[1];
  const date = dateData[2];
  return { year, month, date };
};

export const getMonthStr = (month: number) =>
  monthMap[Math.max(Math.min(11, month), 0)] || "Month";
