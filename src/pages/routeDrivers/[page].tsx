import { RouteDriverListTablePage } from "screens/routeDriver/list/table";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "shared/libs/utils";
import { getRouteDrivers } from "entidades/routeDriver/routeDriver.api";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const page = Number(context?.query?.page ?? 1);
  const data = await getRouteDrivers(page, context);
  return {
    props: {
      data,
      page,
    },
  };
});

export default RouteDriverListTablePage;
