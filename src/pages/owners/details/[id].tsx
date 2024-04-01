import { OwnerDetailsPage } from "@/screens/owner/details";
import { getOwnerById } from "@/entidades/owner/owner.api";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/shared/libs/utils";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const id = context?.query?.id;
  if (!id || typeof id !== "string") {
    return {
      notFound: true,
    };
  }
  const data = await getOwnerById(id, context);
  return {
    props: {
      data,
      id,
    },
  };
});
export default OwnerDetailsPage;
