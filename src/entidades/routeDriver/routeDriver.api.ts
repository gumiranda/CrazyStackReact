import { setupAPIClient } from "shared/api";
import { RouteDriverProps, routeDriverModel } from "./routeDriver.model";
export type GetRouteDriversResponse = {
  routeDrivers: RouteDriverProps[];
  totalCount: number;
  next?: number;
  prev?: number;
};
const registerByPage = 10;
export const getRouteDrivers = async (
  page: number,
  ctx: any,
  params: any = {}
): Promise<GetRouteDriversResponse> => {
  const { data } = await setupAPIClient(ctx).get("/routeDriver/loadByPage", {
    params: { page, sortBy: "createdAt", typeSort: "desc", ...params },
  });
  const { routeDrivers, total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / registerByPage)
    ? totalCount / registerByPage
    : Math.floor(totalCount / registerByPage) + 1;
  const response = {
    routeDrivers: routeDrivers?.map?.((props: RouteDriverProps) =>
      routeDriverModel(props).format()
    ),
    totalCount,
  };
  if (lastPage > page) {
    Object.assign(response, { next: page + 1 });
  }
  if (page > 1) {
    Object.assign(response, { prev: page - 1 });
  }
  return response;
};
type InfiniteProps = {
  pageParam: number;
  ctx: any;
};
export const getInfiniteRouteDrivers = async ({
  pageParam = 1,
  ctx,
}: InfiniteProps): Promise<GetRouteDriversResponse> => {
  return getRouteDrivers(pageParam, ctx);
};
export const getRouteDriverById = async (
  id: string,
  ctx: any
): Promise<RouteDriverProps | null> => {
  try {
    const { data } = await setupAPIClient(ctx).get("/routeDriver/load", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return routeDriverModel(data).format();
  } catch (error) {
    return null;
  }
};
