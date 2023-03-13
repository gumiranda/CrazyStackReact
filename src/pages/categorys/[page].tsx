import { CategoryListTablePage } from "screens/category/list/table";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "shared/libs/utils";
import { getCategorys } from "entidades/category/category.api";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const page = Number(context?.query?.page ?? 1);
  delete context?.query?.page;
  const otherFilters = context?.query;
  const data = await getCategorys(page, context, otherFilters);
  return {
    props: {
      data,
      page,
    },
  };
});

export default CategoryListTablePage;
