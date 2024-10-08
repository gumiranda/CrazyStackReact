import { OwnerListTablePage } from "@/slices/appointments/screens/owner/list/table";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/shared/libs/utils";
import { getOwners } from "@/slices/appointments/entidades/owner/owner.api";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const page = Number(context?.query?.page ?? 1);
  delete context?.query?.page;
  const otherFilters = context?.query;
  const data = await getOwners(page, context, otherFilters);
  return {
    props: {
      data,
      page,
    },
  };
});

export default OwnerListTablePage;
