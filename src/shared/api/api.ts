/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable prefer-const */
import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";
import { signOut } from "shared/libs";
let isRefreshing = false;
let failedRequestsQueue: any = [];

export const getAxios = (token: string): any => {
  return axios.create({
    baseURL: "https://nodejs-production-22cd.up.railway.app/api",
    // baseURL: "http://localhost:3333/api",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);
  const api = getAxios(cookies["belezixadmin.token"]);
  api.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      if (error?.response?.status === 401) {
        if (error?.response?.data?.error === "Unauthorized") {
          console.log("renova token");
          cookies = parseCookies(ctx);
          const { "belezixadmin.refreshToken": refreshToken } = cookies;
          const originalConfig: any = error.config;
          if (!isRefreshing) {
            isRefreshing = true;
            api
              .get("account/refresh", { headers: { refreshtoken: refreshToken } })
              .then((response: any) => {
                const { accessToken: token, refreshToken: newRefreshToken } =
                  response?.data;
                setCookie(ctx, "belezixadmin.token", token, {
                  maxAge: 30 * 24 * 60 * 60,
                  path: "/",
                });
                setCookie(ctx, "belezixadmin.refreshToken", newRefreshToken, {
                  maxAge: 30 * 24 * 60 * 60,
                  path: "/",
                });
                api.defaults.timeout = 15000;
                api.defaults.headers["Authorization"] = `Bearer ${token}`;
                api.defaults.headers["refreshtoken"] = `${newRefreshToken}`;
                failedRequestsQueue.forEach((request: any) => request.onSuccess(token));
                failedRequestsQueue = [];
              })
              .catch((err: any) => {
                failedRequestsQueue.forEach((request: any) => request.onFailure(err));
                failedRequestsQueue = [];
                if (process.browser) {
                  signOut();
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers["Authorization"] = `Bearer ${token}`;
                resolve(api(originalConfig));
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        }
        if (process.browser) {
          signOut();
        }
      }
      return Promise.reject(error);
    }
  );
  return api;
}
export const api = setupAPIClient();
