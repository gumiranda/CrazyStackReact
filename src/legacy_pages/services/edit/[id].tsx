import { ServiceEditPage } from "@/slices/appointments/screens/service/edit";
import { getServiceById } from "@/slices/appointments/entidades/service/service.api";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/shared/libs/utils";
import { getCategorys } from "@/slices/appointments/entidades/category";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const id = context?.query?.id;
  if (!id || typeof id !== "string") {
    return {
      notFound: true,
    };
  }
  const [categorys, data] = await Promise.all([
    getCategorys(1, context),
    getServiceById(id, context),
  ]);
  return {
    props: {
      data,
      id,
      categorys,
    },
  };
});
export default ServiceEditPage;
