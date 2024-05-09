import { getCookies, parseCookies } from "@/shared/libs/utils";
import { parseJSON } from "./parseJSON";
import { redirect } from "next/navigation";
import { Layout } from "@/shared/ui/templates/Layout";

export async function getUser() {
  const allCookies = getCookies();
  const parsedCookies: any = parseCookies(allCookies);
  const { "belezixadmin.user": userComingFromCookie, "belezixadmin.token": token } =
    parsedCookies || {};
  const parsedUser = parseJSON(userComingFromCookie);
  if (!allCookies) return null;

  if (parsedUser?._id) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/load?_id=${parsedUser?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "force-cache",
        }
      );
      const data = await res.json();
      const daysToNextCharge = calculateDaysToNextPayment(data?.payDay);
      if (!data) {
        throw new Error("Erro ao buscar dados");
      }
      return { ...data, daysToNextCharge };
    } catch (error) {
      return null;
    }
  }
  return {};
}

export default async function LayoutPayAuthenticated({ children }) {
  const data = await getUser();
  if (data?.daysToNextCharge && data?.daysToNextCharge < 1) {
    redirect("/payment/pix");
  }
  if (!data) {
    return null;
  }
  return <>{children}</>;
}
export const calculateDaysToNextPayment = (payDay: string) => {
  if (!payDay) return 0;
  return Math.floor(
    (new Date(payDay).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
};
