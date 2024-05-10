import { config } from "@/application/config";
import { PixFeaturesPage } from "@/slices/general/screens/payment/pix/PixFeaturesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${config.systemName} | Minha assinatura`,
  description: `Preencha os seus dados pessoais para garantir a assinatura do ${config.systemName}.`,
};
export default PixFeaturesPage;
