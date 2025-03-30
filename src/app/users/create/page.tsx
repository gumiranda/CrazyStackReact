import { whitelabel } from "@/application/whitelabel";
import { UserCreatePage } from "@/slices/general/screens/user/create";
import type { Metadata } from "next";
import { getServices } from "@/slices/appointments/entidades/service/service.api";
import { parseCookies } from "@/shared/libs/utils";
import { getCookies } from "@/shared/libs/cookies";
import { getOwners } from "@/slices/appointments/entidades/owner";
import { getUser } from "@/shared/libs/utils/layoutPayAsync";
import { redirect } from "next/navigation";

export const revalidate = 3000;
async function getData(pageNumber) {
  const allCookies = await getCookies();
  if (!allCookies) return null;
  const user = await getUser();
  if (user?.daysToNextCharge && user?.daysToNextCharge < 0) {
    return { userHaveToPay: true, data: {}, owner: {} } as any;
  }
  const [data, owner] = await Promise.all([
    getServices(pageNumber, parseCookies(allCookies), {}),
    getOwners(pageNumber, parseCookies(allCookies), {}),
  ]);
  if (!data || !owner) {
    return null;
  }

  return {
    userHaveToPay: user?.daysToNextCharge && user?.daysToNextCharge < 0,
    data,
    owner,
  };
}
export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Criar Profissional`,
  description: `Página de criação de profissionals do ${whitelabel.systemName}. Aqui você pode criar profissional.`,
};

export default async function Page() {
  const data = await getData(1);
  if (data?.userHaveToPay) {
    redirect("/payment/pix");
  }
  if (!data) return null;
  return <UserCreatePage data={data?.data} owner={data?.owner} />;
}
