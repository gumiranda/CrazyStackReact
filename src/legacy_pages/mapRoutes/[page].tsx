import { MapRouteListTablePage } from "@/slices/appointments/screens/mapRoute/list/table";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/shared/libs/utils";
import { getMapRoutes } from "@/slices/appointments/entidades/mapRoute/mapRoute.api";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const page = Number(context?.query?.page ?? 1);
  const data = await getMapRoutes(page, context);
  return {
    props: {
      data,
      page,
    },
  };
});

export default MapRouteListTablePage;
