import axios from "axios";
import { parseCookies } from "nookies";
export function setupAPIClient(ctx = undefined) {
  const cookies = parseCookies(ctx);
  const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: { Authorization: `Bearer ${cookies["belezixadmin.token"]}` },
  });
  return api;
}
export const api = setupAPIClient();