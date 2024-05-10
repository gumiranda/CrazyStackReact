import { ServiceListTablePage } from "@/slices/appointments/screens/service/list/table";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/shared/libs/utils";
import { getServices } from "@/slices/appointments/entidades/service/service.api";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const page = Number(context?.query?.page ?? 1);
  delete context?.query?.page;
  const otherFilters = context?.query;
  const data = await getServices(page, context, otherFilters);
  return {
    props: {
      data,
      page,
    },
  };
});

export default ServiceListTablePage;
