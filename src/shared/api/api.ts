/* eslint-disable prefer-const */
import axios, { AxiosError } from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";
let isRefreshing = false;
let failedRequestsQueue: any = [];

export const getAxios = (token: string) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export function setupAPIClient(ctx = undefined) {
  let cookies: any = ctx;
  if (!cookies?.["belezixadmin.token"]) {
    cookies = parseCookies();
  }
  if (!cookies) {
    return null;
  }
  const api = getAxios(cookies["belezixadmin.token"]);
  api.interceptors.response.use(
    (response: any) => {
      return response;
    },
    (error: any) => {
      if (error?.response?.status === 401) {
        if (error?.response?.data?.error === "Unauthorized") {
          cookies = ctx;
          if (!cookies?.["belezixadmin.token"]) {
            cookies = parseCookies();
          }
          const { "belezixadmin.refreshToken": refreshToken } = cookies;
          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/refresh`, {
              method: "GET",
              headers: {
                refreshtoken: refreshToken,
                "Content-Type": "application/json",
              },
            })
              .then(async (response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (!data || !data.accessToken || !data.refreshToken) {
                  throw new Error("Invalid response format from refresh token endpoint");
                }
                return data;
              })
              .then((data) => {
                const { accessToken: token, refreshToken: newRefreshToken } = data;
                setCookie(undefined, "belezixadmin.token", token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: "/",
                });
                setCookie(null, "belezixadmin.refreshToken", newRefreshToken, {
                  maxAge: 30 * 24 * 60 * 60,
                  path: "/",
                });
                api.defaults.timeout = 15000;
                api.defaults.headers["Authorization"] = `Bearer ${token}`;
                api.defaults.headers["refreshtoken"] = `${newRefreshToken}`;
                failedRequestsQueue.forEach((request: any) => request.onSuccess(token));
                failedRequestsQueue = [];
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request: any) => request.onFailure(err));
                failedRequestsQueue = [];
                if (typeof window === "undefined") {
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
        if (typeof window === "undefined") {
          signOut();
        }
      }
      return Promise.reject(error);
    }
  );
  return api;
}

export const api = setupAPIClient();

export function signOut() {
  destroyCookie(undefined, "belezixadmin.token");
  destroyCookie(undefined, "belezixadmin.refreshToken");
  destroyCookie(undefined, "belezixadmin.user");
  destroyCookie(undefined, "belezixadmin.cache");
  destroyCookie(undefined, "belezixadmin.photo");
}
