import { getAppointments, getInfiniteAppointments } from "./appointment.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetAppointments = (
  page: number,
  options?: UseQueryOptions,
  ctx?: any
): any => {
  return useQuery({
    queryKey: ["appointments", page],
    queryFn: () => getAppointments(page, ctx),
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteAppointments = (
  options: Omit<UseInfiniteQueryOptions, "queryKey">
) => {
  return useInfiniteQuery({
    queryKey: ["appointmentsInfinite"],
    queryFn: ({ pageParam = 1 }: any) => getInfiniteAppointments(pageParam),
    ...options,
  });
};
