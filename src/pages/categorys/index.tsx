import { CategoryListTablePage } from "screens/category/list/table";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "shared/libs/utils";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const data: any = [{ id: 1 }];
  return {
    props: {
      data,
    },
  };
});

export default CategoryListTablePage;
