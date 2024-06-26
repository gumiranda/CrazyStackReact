import { ServiceEditPage } from "@/screens/service/edit";
import { getServiceById } from "@/entidades/service/service.api";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/shared/libs/utils";
import { getCategorys } from "@/entidades/category";
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
