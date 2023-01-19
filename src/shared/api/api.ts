import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";
import { signOut } from "shared/libs";

let isRefreshing = false;
let failedRequestsQueue: any = [];

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3333/api",
    headers: {
      Authorization: `Bearer ${cookies["belezixadmin.token"]}`,
    },
  });
  api.interceptors.response.use(
    (response) => response,
    (error: any) => {
      // (error: AxiosError) => {
      /*
  //    belezix backend
       if (error?.response?.status === 500){
       if(error?.response?.data?.details?.name ==='TokenExpiredError'){

       }
     }
      */
      console.log({ error2: error });
      if (error?.response?.status === 401) {
        if (error?.response?.data?.error === "UnauthorizedError") {
          // renova token
          cookies = parseCookies(ctx);
          const { "belezixadmin.refreshToken": refreshToken } = cookies;
          const originalConfig: any = error.config;
          if (!isRefreshing) {
            isRefreshing = true;
            api
              .get("account/refresh", {
                headers: {
                  refreshtoken: refreshToken,
                },
              })
              .then((response) => {
                const { accessToken: token, refreshToken: newRefreshToken } =
                  response.data;
                setCookie(ctx, "belezixadmin.token", token, {
                  maxAge: 30 * 24 * 60 * 60,
                  path: "/",
                });
                setCookie(ctx, "belezixadmin.refreshToken", newRefreshToken, {
                  maxAge: 30 * 24 * 60 * 60,
                  path: "/",
                });
                api.defaults.timeout = 5000;
                api.defaults.headers["Authorization"] = `Bearer ${token}`;
                failedRequestsQueue.forEach((request: any) => request.onSuccess(token));
                failedRequestsQueue = [];
              })
              .catch((err) => {
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
        // desloga usuario
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
