import { ClientListTablePage } from "screens/client/list/table";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "shared/libs/utils";
import { getClients } from "entidades/client/client.api";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const page = Number(context?.query?.page ?? 1);
  const data = await getClients(page, context);
  return {
    props: {
      data,
      page,
    },
  };
});

export default ClientListTablePage;
