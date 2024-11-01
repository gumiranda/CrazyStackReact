import type { Metadata } from "next";
import { whitelabel } from "@/application/whitelabel";
import { SalesLandingPage } from "@/slices/landing-page/pages/SalesLandingPage";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Agendamentos`,
  description:
    "Conheça nossa plataforma de  agendamentos de serviços, cadastre já o seu negócio!",
};

export default function Page() {
  return <SalesLandingPage />;
}
