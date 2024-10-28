import { getRouteDrivers } from "@/slices/appointments/entidades/routeDriver/routeDriver.api";
import { parseCookies, getCookies } from "@/shared/libs/utils";
import { RouteDriverListTablePage } from "@/slices/appointments/screens/routeDriver/list/table/RouteDriverListTablePage";

export const revalidate = 3000;
async function getData(pageNumber) {
  const allCookies = await getCookies();
  if (!allCookies) return null;
  const res = await getRouteDrivers(pageNumber, parseCookies(allCookies), {});
  if (!res) {
    throw new Error("Erro ao buscar dados");
  }
  return res;
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params;

  const { page } = params;

  const pageNumber = Number(page ?? 1);
  const data = await getData(pageNumber);
  if (!data) {
    return null;
  }
  return <RouteDriverListTablePage data={data} page={pageNumber} />;
}
