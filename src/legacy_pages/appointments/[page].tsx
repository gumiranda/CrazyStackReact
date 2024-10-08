import { AppointmentListTablePage } from "@/slices/appointments/screens/appointment/list/table";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/shared/libs/utils";
import { getAppointments } from "@/slices/appointments/entidades/appointment/appointment.api";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const page = Number(context?.query?.page ?? 1);
  delete context?.query?.page;
  const otherFilters = context?.query;
  const data = await getAppointments(page, context, otherFilters);
  return {
    props: {
      data,
      page,
    },
  };
});

export default AppointmentListTablePage;
