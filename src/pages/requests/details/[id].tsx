import { RequestDetailsPage } from "@/screens/request/details";
import { getRequestById } from "@/entidades/request/request.api";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/shared/libs/utils";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const id = context?.query?.id;
  if (!id || typeof id !== "string") {
    return {
      notFound: true,
    };
  }
  const data = await getRequestById(id, context);
  return {
    props: {
      data,
      id,
    },
  };
});
export default RequestDetailsPage;
