"use client";
import { Box, GenericTable, Head, Pagination } from "@/shared/ui";
import { GetAppointmentsResponse } from "@/entidades/appointment/appointment.api";
import { useAppointmentList } from "../appointmentList.hook";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation(["PAGES"]);
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
      <Box borderRadius={8} bg="secondary.500" p="4" flexGrow="1">
        <GenericTable
          deleteSelectedAction={deleteSelectedAction}
          isLoading={false}
          items={appointments}
          fields={[
            {
              id: "message",
              label: t("PAGES:FIELDS.message", {
                defaultValue: "Mensagem",
              }),
              displayKeyText: true,
            },
            {
              id: "createdAt",
              label: t("PAGES:FIELDS.createdAt", {
                defaultValue: "Data de criação",
              }),
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
          title={t("PAGES:HOME_PAGE.appointments", {
            defaultValue: "Agendamentos",
          })}
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
