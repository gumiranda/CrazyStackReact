import { AppointmentEditPage } from "screens/appointment/edit";
import { getAppointmentById } from "entidades/appointment/appointment.api";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "shared/libs/utils";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const id = context?.query?.id;
  if (!id || typeof id !== "string") {
    return {
      notFound: true,
    };
  }
  const data = await getAppointmentById(id, context);
  return {
    props: {
      data,
      id,
    },
  };
});
export default AppointmentEditPage;
