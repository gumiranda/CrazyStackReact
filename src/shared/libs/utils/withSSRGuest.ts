import {
  GetServerSideProps,
  GetServerSidePropsResult,
  GetServerSidePropsContext,
} from "next";
import { parseCookies } from "nookies";

export function withSSRGuest(fn: GetServerSideProps<any>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<any>> => {
    const cookies = parseCookies(ctx);

    if (cookies["belezixadmin.token"]) {
      return {
        redirect: {
          destination: "/home",
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
}
