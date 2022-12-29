import { AppointmentListTablePage } from "screens/appointment/list/table";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "shared/libs/utils";
import { getAppointments } from "entidades/appointment/appointment.api";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const page = Number(context?.query?.page ?? 1);
  const data = await getAppointments(page, context);
  return {
    props: {
      data,
      page,
    },
  };
});

export default AppointmentListTablePage;
