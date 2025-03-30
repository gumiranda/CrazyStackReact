import { Login } from "@/slices/general/screens/auth/login/LoginPage";
import type { Metadata } from "next";
import { whitelabel } from "@/application/whitelabel";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Agendamentos`,
  description: "Agende seu horário com os melhores barbeiros da cidade",
};

export default function Page() {
  return <Login />;
}
