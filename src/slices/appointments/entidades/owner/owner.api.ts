import { getAPIClient } from "@/shared/api/api";
import { OwnerProps, ownerModel } from "./owner.model";
export type GetOwnersResponse = {
  owners: OwnerProps[];
  totalCount: number;
  next?: number;
  prev?: number;
};
const registerByPage = 10;
export const getOwners = async (
  page: number,
  ctx: any,
  params: any = {}
): Promise<GetOwnersResponse> => {
  const { data } = await getAPIClient(ctx).get("/owner/loadByPage", {
    params: { page, sortBy: "createdAt", typeSort: "desc", ...params },
  });
  const { owners, total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / registerByPage)
    ? totalCount / registerByPage
    : Math.floor(totalCount / registerByPage) + 1;
  const response = {
    owners: owners?.map?.((props: OwnerProps) => ownerModel(props).format()),
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
export const getInfiniteOwners = async ({
  pageParam = 1,
  ctx,
}: InfiniteProps): Promise<GetOwnersResponse> => {
  return getOwners(pageParam, ctx);
};
export const getOwnerById = async (id: string, ctx: any): Promise<OwnerProps | null> => {
  try {
    const { data } = await getAPIClient(ctx).get("/owner/load", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return ownerModel(data).format();
  } catch (error) {
    return null;
  }
};
