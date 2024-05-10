import { MapRouteEditPage } from "@/slices/appointments/screens/mapRoute/edit";
import { getMapRouteById } from "@/slices/appointments/entidades/mapRoute/mapRoute.api";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/shared/libs/utils";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const id = context?.query?.id;
  if (!id || typeof id !== "string") {
    return {
      notFound: true,
    };
  }
  const data = await getMapRouteById(id, context);
  return {
    props: {
      data,
      id,
    },
  };
});
export default MapRouteEditPage;
