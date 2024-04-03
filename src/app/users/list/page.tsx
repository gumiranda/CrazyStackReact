import { config } from "@/application/config";
import { UserGridPage } from "@/screens/user/list/grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${config.systemName} | Profissionals`,
  description: `Página de listagem de profissionals do ${config.systemName}. Aqui você pode ver as profissionals em lista infinita.`,
};
export default UserGridPage;
