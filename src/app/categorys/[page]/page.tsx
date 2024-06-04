import { getCategorys } from "@/slices/appointments/entidades/category/category.api";
import { parseCookies, getCookies } from "@/shared/libs/utils";
import { CategoryListTablePage } from "@/slices/appointments/screens/category/list/table/CategoryListTablePage";

export const revalidate = 3000;
async function getData(pageNumber) {
  const allCookies = getCookies();
  if (!allCookies) return null;
  const res = await getCategorys(pageNumber, parseCookies(allCookies), {});
  if (!res) {
    throw new Error("Erro ao buscar dados");
  }
  return res;
}

export default async function Page({ params: { page } }: { params: { page: string } }) {
  const pageNumber = Number(page ?? 1);
  const data = await getData(pageNumber);
  if (!data) {
    return null;
  }
  return <CategoryListTablePage data={data} page={pageNumber} />;
}
