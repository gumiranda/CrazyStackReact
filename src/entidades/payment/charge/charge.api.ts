import { setupAPIClient } from "@/shared/api";
import { ChargeData } from "./charge.types";
export type GetChargesResponse = {
  charges: ChargeData[];
  totalCount: number;
  next?: number;
  prev?: number;
};
const registerByPage = 10;
export const getCharges = async (
  page: number,
  ctx: any,
  params: any = {}
): Promise<GetChargesResponse> => {
  const { data } = await setupAPIClient(ctx).get("/charge/loadByPage", {
    params: { page, sortBy: "createdAt", typeSort: "desc", ...params },
  });
  const { charges, total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / registerByPage)
    ? totalCount / registerByPage
    : Math.floor(totalCount / registerByPage) + 1;
  const response = {
    charges,
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
export const getInfiniteCharges = async ({
  pageParam = 1,
  ctx,
}: InfiniteProps): Promise<GetChargesResponse> => {
  return getCharges(pageParam, ctx);
};
export const getChargeById = async (id: string, ctx: any): Promise<ChargeData | null> => {
  try {
    const { data } = await setupAPIClient(ctx).get("/charge/load", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return data;
  } catch (error) {
    return null;
  }
};
