import { whitelabel } from "@/application/whitelabel";
import { AppointmentCreatePage } from "@/slices/appointments/screens/appointment/create";
import type { Metadata } from "next";
import { getOwners } from "@/slices/appointments/entidades/owner/owner.api";
import { parseCookies } from "@/shared/libs/utils";
import { getCookies } from "@/shared/libs/cookies";

export const revalidate = 3000;
async function getData(pageNumber) {
  const allCookies = await getCookies();
  if (!allCookies) return null;
  const res = await getOwners(pageNumber, parseCookies(allCookies), {});
  if (!res) {
    return null;
  }
  return res;
}
export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Criar Agendamento`,
  description: `Página de criação de agendamentos do ${whitelabel.systemName}. Aqui você pode criar agendamento.`,
};

export default async function Page() {
  const data = await getData(1);
  if (!data) return null;
  return <AppointmentCreatePage data={data} />;
}
