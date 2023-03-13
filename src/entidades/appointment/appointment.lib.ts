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
  return useQuery(["appointments", page], () => getAppointments(page, ctx), {
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteAppointments = (options?: UseInfiniteQueryOptions) => {
  return useInfiniteQuery(
    ["appointmentsInfinite"],
    getInfiniteAppointments as any,
    options as any
  );
};
