import { RequestCreatePage } from "@/slices/appointments/screens/request/create";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/shared/libs/utils";
import { getOwners } from "@/slices/appointments/entidades/owner/owner.api";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const owners = await getOwners(1, context);

  return {
    props: {
      owners,
    },
  };
});

export default RequestCreatePage;
