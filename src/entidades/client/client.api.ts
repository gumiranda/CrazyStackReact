import { setupAPIClient } from "shared/api";
import { ClientProps, clientModel } from "./client.model";
export type GetClientsResponse = {
  clients: ClientProps[];
  totalCount: number;
  next?: number;
  prev?: number;
};
const registerByPage = 10;
export const getClients = async (
  page: number,
  ctx: any,
  params: any = {}
): Promise<GetClientsResponse> => {
  const { data } = await setupAPIClient(ctx).get("/client/loadByPage", {
    params: { page, sortBy: "createdAt", typeSort: "desc", ...params },
  });
  const { clients, total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / registerByPage)
    ? totalCount / registerByPage
    : Math.floor(totalCount / registerByPage) + 1;
  const response = {
    clients: clients?.map?.((props: ClientProps) => clientModel(props).format()),
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
export const getInfiniteClients = async ({
  pageParam = 1,
  ctx,
}: InfiniteProps): Promise<GetClientsResponse> => {
  return getClients(pageParam, ctx);
};
export const getClientById = async (
  id: string,
  ctx: any
): Promise<ClientProps | null> => {
  try {
    const { data } = await setupAPIClient(ctx).get("/client/load", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return clientModel(data).format();
  } catch (error) {
    return null;
  }
};
