import { OwnerListTablePage } from "screens/owner/list/table";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "shared/libs/utils";
import { getOwners } from "entidades/owner/owner.api";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const page = Number(context?.query?.page ?? 1);
  const data = await getOwners(page, context);
  return {
    props: {
      data,
      page,
    },
  };
});

export default OwnerListTablePage;
