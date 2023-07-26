import {
  GetServerSideProps,
  GetServerSidePropsResult,
  GetServerSidePropsContext,
} from "next";
import { parseCookies, setCookie } from "nookies";
import { getAxios } from "shared/api";
export function withSSRAuth<P extends { [key: string]: any }>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    if (!cookies["belezixadmin.token"]) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    try {
      return await fn(ctx);
    } catch (error: any) {
      // if (error?.response?.status === 401) {
      //   if (error?.response?.data?.error === "UnauthorizedError") {
      //     // renova token
      //     const { "belezixadmin.refreshToken": refreshToken } = cookies;
      //     const api = getAxios(cookies["belezixadmin.token"]);
      //     api
      //       .get("account/refresh", {
      //         headers: {
      //           refreshtoken: refreshToken,
      //         },
      //       })
      //       .then((response: any) => {
      //         const { accessToken: token, refreshToken: newRefreshToken } = response.data;
      //         setCookie(ctx, "belezixadmin.token", token, {
      //           maxAge: 30 * 24 * 60 * 60,
      //           path: "/",
      //         });
      //         setCookie(ctx, "belezixadmin.refreshToken", newRefreshToken, {
      //           maxAge: 30 * 24 * 60 * 60,
      //           path: "/",
      //         });
      //         api.defaults.timeout = 5000;
      //         api.defaults.headers["Authorization"] = `Bearer ${token}`;
      //       });
      //   }
      // }
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  };
}
