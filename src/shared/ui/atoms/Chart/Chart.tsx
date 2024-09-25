"use client";
import { theme } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const Chart = ({ options, series }: any) => {
  return (
    <ApexChart
      options={options as any}
      series={series}
      type="area"
      width={300}
      height={160}
    />
  );
};
export const defaultOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  grid: {
    show: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [],
  },
  fill: {
    type: "gradient",
    opacity: 0.3,
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};
