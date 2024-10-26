import type { Metadata } from "next";
import { config } from "@/application/config";
import { SalesLandingPage } from "@/slices/landing-page/pages/SalesLandingPage";

export const metadata: Metadata = {
  title: `${config.systemName} | Agendamentos`,
  description:
    "Conheça nossa plataforma de  agendamentos de serviços, cadastre já o seu negócio!",
};

export default function Page() {
  return <SalesLandingPage />;
}
