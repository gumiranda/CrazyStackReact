import { setupAPIClient } from "shared/api";
import { RequestProps, requestModel } from "./request.model";
export type GetRequestsResponse = {
  requests: RequestProps[];
  totalCount: number;
  next?: number;
  prev?: number;
};
const registerByPage = 10;
export const getRequests = async (
  page: number,
  ctx: any,
  params: any = {}
): Promise<GetRequestsResponse> => {
  const { data } = await setupAPIClient(ctx).get("/request/loadByPage", {
    params: { page, sortBy: "createdAt", typeSort: "desc", ...params },
  });
  const { requests, total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / registerByPage)
    ? totalCount / registerByPage
    : Math.floor(totalCount / registerByPage) + 1;
  const response = {
    requests: requests?.map?.((props: RequestProps) => requestModel(props).format()),
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
export const getInfiniteRequests = async ({
  pageParam = 1,
  ctx,
}: InfiniteProps): Promise<GetRequestsResponse> => {
  return getRequests(pageParam, ctx);
};
export const getRequestById = async (
  id: string,
  ctx: any
): Promise<RequestProps | null> => {
  try {
    const { data } = await setupAPIClient(ctx).get("/request/load", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return requestModel(data).format();
  } catch (error) {
    return null;
  }
};
