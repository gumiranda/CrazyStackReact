import { UserEditPage } from "@/slices/general/screens/user/edit";
import { getUserById } from "@/slices/general/entidades/user/user.api";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/shared/libs/utils";
import { getServices } from "@/slices/appointments/entidades/service";
import { getOwners } from "@/slices/appointments/entidades/owner";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const id = context?.query?.id;
  if (!id || typeof id !== "string") {
    return {
      notFound: true,
    };
  }
  const [data, service, owner] = await Promise.all([
    getUserById(id, context),
    getServices(1, context),
    getOwners(1, context),
  ]);
  return {
    props: {
      data,
      id,
      service,
      owner,
    },
  };
});
export default UserEditPage;
