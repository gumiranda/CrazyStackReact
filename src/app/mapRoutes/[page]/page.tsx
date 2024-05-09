import { getMapRoutes } from "@/entidades/mapRoute/mapRoute.api";
import { parseCookies, getCookies } from "@/shared/libs/utils";
import { MapRouteListTablePage } from "@/screens/mapRoute/list/table/MapRouteListTablePage";
import LayoutPayAuthenticated from "@/shared/libs/utils/layoutPayAsync";
export const revalidate = 3000;
async function getData(pageNumber) {
  const allCookies = getCookies();
  if (!allCookies) return null;
  const res = await getMapRoutes(pageNumber, parseCookies(allCookies), {});
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
  return (
    <LayoutPayAuthenticated>
      <MapRouteListTablePage data={data} page={pageNumber} />;
    </LayoutPayAuthenticated>
  );
}
