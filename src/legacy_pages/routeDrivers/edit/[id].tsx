import { RouteDriverEditPage } from "@/slices/appointments/screens/routeDriver/edit";
import { getRouteDriverById } from "@/slices/appointments/entidades/routeDriver/routeDriver.api";
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
