import { setupAPIClient } from "shared/api";
import { ServiceProps, serviceModel } from "./service.model";
export type GetServicesResponse = {
  services: ServiceProps[];
  totalCount: number;
  next?: number;
  prev?: number;
};
const registerByPage = 10;
export const getServices = async (
  page: number,
  ctx: any
): Promise<GetServicesResponse> => {
  const { data } = await setupAPIClient(ctx).get("/service/loadByPage", {
    params: { page, sortBy: "createdAt", typeSort: "desc" },
  });
  const { services, total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / registerByPage)
    ? totalCount / registerByPage
    : Math.floor(totalCount / registerByPage) + 1;
  const response = {
    services: services?.map?.((props: ServiceProps) => serviceModel(props).format()),
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
export const getInfiniteServices = async ({
  pageParam = 1,
  ctx,
}: InfiniteProps): Promise<GetServicesResponse> => {
  return getServices(pageParam, ctx);
};
export const getServiceById = async (
  id: string,
  ctx: any
): Promise<ServiceProps | null> => {
  try {
    const { data } = await setupAPIClient(ctx).get("/service/load", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return serviceModel(data).format();
  } catch (error) {
    return null;
  }
};
