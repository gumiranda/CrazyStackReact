import { ClientCreatePage } from "@/screens/client/create";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/shared/libs/utils";
import { getUsers } from "@/entidades/user";

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const users = await getUsers(1, context, { role: "client" });
  return {
    props: {
      users,
    },
  };
});
export default ClientCreatePage;
