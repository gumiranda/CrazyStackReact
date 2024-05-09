import { config } from "@/application/config";
import { AppointmentCreatePage } from "@/screens/appointment/create";
import type { Metadata } from "next";
import { getOwners } from "@/entidades/owner/owner.api";
import { parseCookies, getCookies } from "@/shared/libs/utils";
import LayoutPayAuthenticated from "@/shared/libs/utils/layoutPayAsync";

export const revalidate = 3000;
async function getData(pageNumber) {
  const allCookies = getCookies();
  if (!allCookies) return null;
  const res = await getOwners(pageNumber, parseCookies(allCookies), {});
  if (!res) {
    return null;
  }
  return res;
}
export const metadata: Metadata = {
  title: `${config.systemName} | Criar Agendamento`,
  description: `Página de criação de agendamentos do ${config.systemName}. Aqui você pode criar agendamento.`,
};

export default async function Page() {
  const data = await getData(1);
  if (!data) return null;
  return (
    <LayoutPayAuthenticated>
      <AppointmentCreatePage data={data} />
    </LayoutPayAuthenticated>
  );
}
