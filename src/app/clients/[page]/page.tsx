import { getClients } from "@/slices/appointments/entidades/client/client.api";
import { parseCookies, getCookies } from "@/shared/libs/utils";
import { ClientListTablePage } from "@/slices/appointments/screens/client/list/table/ClientListTablePage";

export const revalidate = 3000;
async function getData(pageNumber) {
  const allCookies = getCookies();
  if (!allCookies) return null;
  const res = await getClients(pageNumber, parseCookies(allCookies), {});
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
  return <ClientListTablePage data={data} page={pageNumber} />;
}
