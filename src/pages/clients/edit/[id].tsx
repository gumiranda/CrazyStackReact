import { ClientEditPage } from "screens/client/edit";
import { getClientById } from "entidades/client/client.api";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "shared/libs/utils";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const id = context?.query?.id;
  if (!id || typeof id !== "string") {
    return {
      notFound: true,
    };
  }
  const data = await getClientById(id, context);
  return {
    props: {
      data,
      id,
    },
  };
});
export default ClientEditPage;
