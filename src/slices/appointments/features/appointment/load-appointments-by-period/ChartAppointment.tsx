import { Chart, defaultOptions } from "@/shared/ui";
import { startOfDay } from "date-fns";
import { useEffect, useState } from "react";

export const ChartAppointment = ({ isLoading, error, data }) => {
  const [series, setSeries] = useState<any>([]);
  const [options, setOptions] = useState<any>(defaultOptions);
  const sortedCategories = data?.sort?.(
    (a: any, b: any) =>
      startOfDay(new Date(a?.initDate)).getTime() -
      startOfDay(new Date(b?.initDate)).getTime()
  );
  const firstDate = sortedCategories?.[0]?.initDate;
  const lastDate = sortedCategories?.[sortedCategories.length - 1]?.initDate;
  const counterPerDate = {};
  useEffect(() => {
    if (!isLoading && !error && data?.length > 0) {
      for (
        let date = new Date(firstDate);
        date <= new Date(lastDate);
        date.setDate(date.getDate() + 1)
      ) {
        const dateFormatted = startOfDay(date).toISOString();
        counterPerDate[dateFormatted] = 0;
      }
      sortedCategories.forEach((item: any) => {
        const dateFormatted = startOfDay(new Date(item?.initDate)).toISOString();
        counterPerDate[dateFormatted] = isNaN(counterPerDate[dateFormatted])
          ? 1
          : counterPerDate[dateFormatted] + 1;
      });
      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories: Object.keys(counterPerDate).map((key) =>
            new Date(key).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })
          ),
        },
      }));
      setSeries([
        {
          name: "Agendamentos",
          data: Object.values(counterPerDate).map((value) => value?.toString?.()),
        },
      ]);
    }
  }, [isLoading, error, data]);
  return <Chart options={options} series={series} />;
};
