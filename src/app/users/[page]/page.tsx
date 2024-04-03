import { getUsers } from "@/entidades/user/user.api";
import { parseCookies, getCookies } from "@/shared/libs/utils";
import { UserListTablePage } from "@/screens/user/list/table/UserListTablePage";
export const revalidate = 3000;
async function getData(pageNumber) {
  const allCookies = getCookies();
  if (!allCookies) return null;
  const res = await getUsers(pageNumber, parseCookies(allCookies), {});
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
  return <UserListTablePage data={data} page={pageNumber} />;
}
