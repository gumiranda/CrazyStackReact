import { RequestListTablePage } from "screens/request/list/table";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "shared/libs/utils";
import { getRequests } from "entidades/request/request.api";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const page = Number(context?.query?.page ?? 1);
  const data = await getRequests(page, context);
  return {
    props: {
      data,
      page,
    },
  };
});

export default RequestListTablePage;
