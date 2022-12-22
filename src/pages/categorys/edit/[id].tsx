import { CategoryEditPage } from "screens/category/edit";
import { getCategoryById } from "entidades/category/category.api";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "shared/libs/utils";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const id = context?.query?.id;
  if (!id || typeof id !== "string") {
    return {
      notFound: true,
    };
  }
  const data = await getCategoryById(id, context);
  return {
    props: {
      data,
      id,
    },
  };
});
export default CategoryEditPage;
