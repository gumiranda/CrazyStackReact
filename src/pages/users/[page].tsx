import { UserListTablePage } from "screens/user/list/table";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "shared/libs/utils";
import { getUsers } from "entidades/user/user.api";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const page = Number(context?.query?.page ?? 1);
  delete context?.query?.page;
  const otherFilters = { ...context?.query };
  const data = await getUsers(page, context, otherFilters);
  return {
    props: {
      data,
      page,
    },
  };
});

export default UserListTablePage;
