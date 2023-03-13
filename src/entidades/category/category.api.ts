import { setupAPIClient } from "shared/api";
import { CategoryProps, categoryModel } from "./category.model";
export type GetCategorysResponse = {
  categorys: CategoryProps[];
  totalCount: number;
  next?: number;
  prev?: number;
};
const registerByPage = 10;
export const getCategorys = async (
  page: number,
  ctx: any,
  params: any = {}
): Promise<GetCategorysResponse> => {
  const { data } = await setupAPIClient(ctx).get("/category/loadByPage", {
    params: { page, sortBy: "createdAt", typeSort: "desc", ...params },
  });
  const { categorys, total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / registerByPage)
    ? totalCount / registerByPage
    : Math.floor(totalCount / registerByPage) + 1;
  const response = {
    categorys: categorys?.map?.((props: CategoryProps) => categoryModel(props).format()),
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
export const getInfiniteCategorys = async ({
  pageParam = 1,
  ctx,
}: InfiniteProps): Promise<GetCategorysResponse> => {
  return getCategorys(pageParam, ctx);
};
export const getCategoryById = async (
  id: string,
  ctx: any
): Promise<CategoryProps | null> => {
  try {
    const { data } = await setupAPIClient(ctx).get("/category/load", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return categoryModel(data).format();
  } catch (error) {
    return null;
  }
};
