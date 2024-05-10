import { OwnerEditPage } from "@/slices/appointments/screens/owner/edit";
import { getOwnerById } from "@/slices/appointments/entidades/owner/owner.api";
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
export default OwnerEditPage;
