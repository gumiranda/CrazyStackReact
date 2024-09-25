import { setupAPIClient } from "@/shared/api";
import { MapRouteProps, mapRouteModel } from "./mapRoute.model";
export type GetMapRoutesResponse = {
  mapRoutes: MapRouteProps[];
  totalCount: number;
  next?: number;
  prev?: number;
};
const registerByPage = 10;
export const getMapRoutes = async (
  page: number,
  ctx: any,
  params: any = {}
): Promise<GetMapRoutesResponse> => {
  const { data } = await setupAPIClient(ctx).get("/mapRoute/loadByPage", {
    params: { page, sortBy: "createdAt", typeSort: "desc", ...params },
  });
  const { mapRoutes, total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / registerByPage)
    ? totalCount / registerByPage
    : Math.floor(totalCount / registerByPage) + 1;
  const response = {
    mapRoutes: mapRoutes?.map?.((props: MapRouteProps) => mapRouteModel(props).format()),
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
export const getInfiniteMapRoutes = async ({
  pageParam = 1,
  ctx,
}: InfiniteProps): Promise<GetMapRoutesResponse> => {
  return getMapRoutes(pageParam, ctx);
};
export const getMapRouteById = async (
  id: string,
  ctx: any
): Promise<MapRouteProps | null> => {
  try {
    const { data } = await setupAPIClient(ctx).get("/mapRoute/load", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return mapRouteModel(data).format();
  } catch (error) {
    return null;
  }
};
