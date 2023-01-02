import { ServiceDetailsPage } from "screens/service/details";
import { getServiceById } from "entidades/service/service.api";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "shared/libs/utils";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const id = context?.query?.id;
  if (!id || typeof id !== "string") {
    return {
      notFound: true,
    };
  }
  const data = await getServiceById(id, context);
  return {
    props: {
      data,
      id,
    },
  };
});
export default ServiceDetailsPage;
