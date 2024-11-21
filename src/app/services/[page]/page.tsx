import { getServices } from "@/slices/appointments/entidades/service/service.api";
import { parseCookies, getCookies } from "@/shared/libs/utils";
import { ServiceListTablePage } from "@/slices/appointments/screens/service/list/table/ServiceListTablePage";

export const revalidate = 3000;
async function getData(pageNumber) {
  const allCookies = await getCookies();
  if (!allCookies) return null;
  const res = await getServices(pageNumber, parseCookies(allCookies), {});
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
  return <ServiceListTablePage data={data} page={pageNumber} />;
}
