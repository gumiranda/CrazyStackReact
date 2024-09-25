import { GetServerSideProps } from "next";
import { UserCreatePage } from "@/slices/general/screens/user/create";
import { withSSRAuth } from "@/shared/libs/utils";
import { getServices } from "@/slices/appointments/entidades/service/service.api";
import { getOwners } from "@/slices/appointments/entidades/owner/owner.api";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const [data, owner] = await Promise.all([
    getServices(1, context),
    getOwners(1, context),
  ]);
  return {
    props: {
      data,
      owner,
    },
  };
});
export default UserCreatePage;
