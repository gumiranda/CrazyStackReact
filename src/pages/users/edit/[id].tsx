import { UserEditPage } from "screens/user/edit";
import { getUserById } from "entidades/user/user.api";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "shared/libs/utils";
import { getServices } from "entidades/service";
import { getOwners } from "entidades/owner";
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
