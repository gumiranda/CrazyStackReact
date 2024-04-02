import { RouteDriverEditPage } from "@/screens/routeDriver/edit";
import { getRouteDriverById } from "@/entidades/routeDriver/routeDriver.api";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/shared/libs/utils";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const id = context?.query?.id;
  if (!id || typeof id !== "string") {
    return {
      notFound: true,
    };
  }
  const data = await getRouteDriverById(id, context);
  return {
    props: {
      data,
      id,
    },
  };
});
export default RouteDriverEditPage;
