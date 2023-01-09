import { RequestListTablePage } from "screens/request/list/table";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "shared/libs/utils";
import { getRequests } from "entidades/request/request.api";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const page = Number(context?.query?.page ?? 1);
  delete context?.query?.page;
  const otherFilters = { ...context?.query };
  const data = await getRequests(page, context, otherFilters);
  return {
    props: {
      data,
      page,
    },
  };
});

export default RequestListTablePage;
