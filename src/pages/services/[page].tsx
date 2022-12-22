import { ServiceListTablePage } from "screens/service/list/table";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "shared/libs/utils";
import { getServices } from "entidades/service/service.api";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const page = Number(context?.query?.page ?? 1);
  const data = await getServices(page, context);
  return {
    props: {
      data,
      page,
    },
  };
});

export default ServiceListTablePage;
