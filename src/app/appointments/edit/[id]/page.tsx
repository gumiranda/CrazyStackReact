import { getAppointmentById } from "@/entidades/appointment/appointment.api";
import { getCookies, parseCookies } from "@/shared/libs/utils";
export const revalidate = 3000;

import { config } from "@/application/config";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AppointmentEditPage } from "@/screens/appointment/edit";
import { getOwners } from "@/entidades/owner/owner.api";
import LayoutPayAuthenticated from "@/shared/libs/utils/layoutPayAsync";

export const metadata: Metadata = {
  title: `${config.systemName} | Editar Agendamento`,
  description: `Página de edição de agendamentos do ${config.systemName}. Aqui você pode editar agendamento.`,
};

async function getData(id) {
  const allCookies = getCookies();
  const parsedCookies = parseCookies(allCookies);
  if (!parsedCookies?.["belezixadmin.token"]) {
    return null;
  }
  const [owners, data] = await Promise.all([
    getOwners(1, parseCookies(allCookies), {}),
    getAppointmentById(id, parsedCookies),
  ]);
  if (!data || !owners) {
    return null;
  }
  return { data, owners };
}
export default async function Page({ params: { id } }: { params: { id: string } }) {
  const { data, owners } = (await getData(id)) || {};
  if (!data || !owners) {
    redirect("/login");
  }
  return (
    <LayoutPayAuthenticated>
      <AppointmentEditPage data={data} id={id} owners={owners} />;
    </LayoutPayAuthenticated>
  );
}
