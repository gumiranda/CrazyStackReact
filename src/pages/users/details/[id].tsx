import { UserDetailsPage } from "screens/user/details";
import { getUserById } from "entidades/user/user.api";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "shared/libs/utils";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const id = context?.query?.id;
  if (!id || typeof id !== "string") {
    return {
      notFound: true,
    };
  }
  const data = await getUserById(id, context);
  return {
    props: {
      data,
      id,
    },
  };
});
export default UserDetailsPage;
