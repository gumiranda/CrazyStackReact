import { ServiceCreatePage } from "@/screens/service/create";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/shared/libs/utils";
import { getCategorys } from "@/entidades/category/category.api";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const data = await getCategorys(1, context);
  return {
    props: {
      data,
    },
  };
});

export default ServiceCreatePage;
