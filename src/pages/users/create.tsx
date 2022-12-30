import { UserCreatePage } from "screens/user/create";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "shared/libs/utils";
import { getServices } from "entidades/service/service.api";
import { getOwners } from "entidades/owner/owner.api";
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
