import { setupAPIClient } from "@/shared/api";
import type { PlaceProps } from ".";
import { placeModel } from "./place.model";
export type GetPlacesResponse = {
  places: PlaceProps[];
  totalCount: number;
  next?: number;
  prev?: number;
};
const registerByPage = 10;
export const getPlaces = async (
  page: number,
  ctx: any,
  params: any = {}
): Promise<GetPlacesResponse> => {
  const { data } = await setupAPIClient(ctx).get("/place/loadByPage", {
    params: { page, sortBy: "createdAt", typeSort: "desc", ...params },
  });
  const { places, total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / registerByPage)
    ? totalCount / registerByPage
    : Math.floor(totalCount / registerByPage) + 1;
  const response = {
    places: places?.map?.((props: PlaceProps) => placeModel(props).format()),
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
export const getInfinitePlaces = async ({
  pageParam = 1,
  ctx,
}: InfiniteProps): Promise<GetPlacesResponse> => {
  return getPlaces(pageParam, ctx);
};
export const getPlaceById = async (id: string, ctx: any): Promise<PlaceProps | null> => {
  try {
    const { data } = await setupAPIClient(ctx).get("/place/load", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return placeModel(data).format();
  } catch (error) {
    return null;
  }
};
