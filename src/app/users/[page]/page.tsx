import { getUsers } from "@/slices/general/entidades/user/user.api";
import { parseCookies, getCookies } from "@/shared/libs/utils";
import { UserListTablePage } from "@/slices/general/screens/user/list/table/UserListTablePage";

export const revalidate = 3000;
async function getData(pageNumber) {
  const allCookies = await getCookies();
  if (!allCookies) return null;
  const res = await getUsers(pageNumber, parseCookies(allCookies), {
    role: "professional",
  });
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
  return <UserListTablePage data={data} page={pageNumber} />;
}
