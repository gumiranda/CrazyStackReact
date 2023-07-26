import axios from "axios";
import { parseCookies } from "nookies";
export function setupAPIClient(ctx = undefined) {
  const cookies = parseCookies(ctx);
  const api = axios.create({
    baseURL: "https://nodejs-production-22cd.up.railway.app/api",
    headers: { authorization: `Bearer ${cookies["belezixadmin.token"]}` },
  });
  return api;
}
export const api = setupAPIClient();
