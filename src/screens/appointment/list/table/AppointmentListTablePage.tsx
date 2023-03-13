import { Box, GenericTable, Head, Pagination } from "shared/ui";
import { GetAppointmentsResponse } from "entidades/appointment/appointment.api";
import { useAppointmentList } from "../appointmentList.hook";
type AppointmentListTablePageProps = {
  data: GetAppointmentsResponse;
  page: number;
};
const Text = ({ id, ...data }: any) => {
  return <h1 data-testid={"h1TestId" + id}>{data[id]}</h1>;
};
export const AppointmentListTablePage = ({
  page = 0,
  data,
}: AppointmentListTablePageProps) => {
  const {
    appointments,
    setAppointments,
    handlePrefetchAppointment,
    deleteSelectedAction,
    total,
    setPage,
  } = useAppointmentList({
    page,
    initialData: data,
  });
  return (
    <>
      <Head
        title={"Belezix Admin | Agendamentos"}
        description="Página de listagem de agendamentos do painel de Admin Belezix"
      />
      <Box borderRadius={8} bg="purple.800" p="4" flexGrow="1">
        <GenericTable
          deleteSelectedAction={deleteSelectedAction}
          isLoading={false}
          items={appointments}
          fields={[
            { id: "message", label: "Mensagem", displayKeyText: true },
            {
              id: "createdAt",
              label: "Data de criação",
              displayKeyText: false,
              children: <Text />,
            },
          ]}
          setItems={setAppointments}
          linkOnMouseEnter={handlePrefetchAppointment}
          error={undefined}
          route={"/appointments"}
          routeDetails={"/appointments/details"}
          routeCreate={"/appointments/create"}
          routeList={"/appointments/list"}
          title={"Agendamentos"}
        />
        <Pagination
          onPageChange={setPage}
          currentPage={page}
          totalCountOfRegisters={total}
        />
      </Box>
    </>
  );
};
