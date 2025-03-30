import { getMapRoutes } from "@/slices/appointments/entidades/mapRoute/mapRoute.api";
import { parseCookies } from "@/shared/libs/utils";
import { getCookies } from "@/shared/libs/cookies";
import { MapRouteListTablePage } from "@/slices/appointments/screens/mapRoute/list/table/MapRouteListTablePage";

export const revalidate = 3000;
async function getData(pageNumber) {
  const allCookies = await getCookies();
  if (!allCookies) return null;
  const res = await getMapRoutes(pageNumber, parseCookies(allCookies), {});
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
  return <MapRouteListTablePage data={data} page={pageNumber} />;
}
