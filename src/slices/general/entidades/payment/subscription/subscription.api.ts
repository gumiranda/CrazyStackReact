import { setupAPIClient } from "@/shared/api";
import { SubscriptionData } from "./subscription.types";
export type GetSubscriptionsResponse = {
  subscriptions: SubscriptionData[];
  totalCount: number;
  next?: number;
  prev?: number;
};
const registerByPage = 10;
export const getSubscriptions = async (
  page: number,
  ctx: any,
  params: any = {}
): Promise<GetSubscriptionsResponse> => {
  const { data } = await setupAPIClient(ctx).get("/subscription/loadByPage", {
    params: { page, sortBy: "createdAt", typeSort: "desc", ...params },
  });
  const { subscriptions, total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / registerByPage)
    ? totalCount / registerByPage
    : Math.floor(totalCount / registerByPage) + 1;
  const response = {
    subscriptions,
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
export const getInfiniteSubscriptions = async ({
  pageParam = 1,
  ctx,
}: InfiniteProps): Promise<GetSubscriptionsResponse> => {
  return getSubscriptions(pageParam, ctx);
};
export const getMySubscription = async (
  id,
  ctx: any
): Promise<SubscriptionData | null> => {
  try {
    const result = await setupAPIClient(ctx).get("/subscription/load", {
      params: { id },
    });
    const { data } = result;
    if (!data) {
      return null;
    }
    return data;
  } catch (error) {
    return null;
  }
};
