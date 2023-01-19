import { ClientListTablePage } from "screens/client/list/table";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "shared/libs/utils";
import { getClients } from "entidades/client/client.api";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const page = Number(context?.query?.page ?? 1);
  delete context?.query?.page;
  const otherFilters = { ...context?.query };
  const data = await getClients(page, context, otherFilters);
  return {
    props: {
      data,
      page,
    },
  };
});

export default ClientListTablePage;
