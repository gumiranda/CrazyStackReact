import { ClientDetailsPage } from "@/slices/appointments/screens/client/details";
import { getClientById } from "@/slices/appointments/entidades/client/client.api";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/shared/libs/utils";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const id = context?.query?.id;
  if (!id || typeof id !== "string") {
    return {
      notFound: true,
    };
  }
  const data = await getClientById(id, context);
  return {
    props: {
      data,
      id,
    },
  };
});
export default ClientDetailsPage;
