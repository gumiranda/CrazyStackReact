import { ServiceCreatePage } from "@/slices/appointments/screens/service/create";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/shared/libs/utils";
import { getCategorys } from "@/slices/appointments/entidades/category/category.api";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const data = await getCategorys(1, context);
  return {
    props: {
      data,
    },
  };
});

export default ServiceCreatePage;
