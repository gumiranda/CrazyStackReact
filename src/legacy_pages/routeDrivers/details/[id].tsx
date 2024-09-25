import { RouteDriverDetailsPage } from "@/slices/appointments/screens/routeDriver/details";
import { getRouteDriverById } from "@/slices/appointments/entidades/routeDriver/routeDriver.api";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/shared/libs/utils";
import { getMapRouteById } from "@/slices/appointments/entidades/mapRoute/mapRoute.api";

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const id = context?.query?.id;
  if (!id || typeof id !== "string") {
    return {
      notFound: true,
    };
  }
  const data = await getRouteDriverById(id, context);
  if (data?.routeId) {
    const mapRoute = await getMapRouteById(data?.routeId, context);
    return {
      props: {
        data,
        id,
        mapRoute,
      },
    };
  }
  return {
    props: {
      data,
      id,
    },
  };
});
export default RouteDriverDetailsPage;
