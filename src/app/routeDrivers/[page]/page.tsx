import { getRouteDrivers } from "@/slices/appointments/entidades/routeDriver/routeDriver.api";
import { parseCookies, getCookies } from "@/shared/libs/utils";
import { RouteDriverListTablePage } from "@/slices/appointments/screens/routeDriver/list/table/RouteDriverListTablePage";
import LayoutPayAuthenticated from "@/shared/libs/utils/layoutPayAsync";
export const revalidate = 3000;
async function getData(pageNumber) {
  const allCookies = getCookies();
  if (!allCookies) return null;
  const res = await getRouteDrivers(pageNumber, parseCookies(allCookies), {});
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
      <RouteDriverListTablePage data={data} page={pageNumber} />
    </LayoutPayAuthenticated>
  );
}
