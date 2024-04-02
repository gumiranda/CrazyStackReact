import { cookies } from "next/headers";
export function getCookies(): any {
  try {
    const cookieStore = cookies().getAll();
    return cookieStore;
  } catch (error) {
    return null;
  }
}
