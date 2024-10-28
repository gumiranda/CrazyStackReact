import { getAppointmentById } from "@/slices/appointments/entidades/appointment/appointment.api";
import { getCookies, parseCookies } from "@/shared/libs/utils";
export const revalidate = 3000;

import { AppointmentDetailsPage } from "@/slices/appointments/screens/appointment/details";
import { config } from "@/application/config";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `${config.systemName} | Detalhes da Agendamento`,
  description: `Página de detalhes de agendamentos do ${config.systemName}. Aqui você pode ver os detalhes de agendamento.`,
};

async function getData(id) {
  const allCookies = await getCookies();
  const parsedCookies = parseCookies(allCookies);
  if (!parsedCookies?.["belezixadmin.token"]) {
    return null;
  }
  const res = await getAppointmentById(id, parsedCookies);
  if (!res) {
    return null;
  }
  return res;
}
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const { id } = params;

  const data = await getData(id);
  if (!data) {
    redirect("/login");
  }
  return <AppointmentDetailsPage data={data} id={id} />;
}
