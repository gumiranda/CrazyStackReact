"use client";
import { Box, GenericTable, Head, Pagination } from "@/shared/ui";
import { GetAppointmentsResponse } from "@/slices/appointments/entidades/appointment/appointment.api";
import { useAppointmentList } from "../appointmentList.hook";
import { useTranslation } from "react-i18next";
import { useBreakpointValue } from "@chakra-ui/react";
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
  const isMobile = useBreakpointValue({ base: true, md: false });
  const fieldsMobile = [
    {
      id: "datePickerSelected",
      label: t("PAGES:FIELDS.datePickerSelected", {
        defaultValue: "Data",
      }),
      displayKeyText: true,
    },
    {
      id: "initHour",
      label: t("PAGES:FIELDS.initHour", {
        defaultValue: "Horário Início",
      }),
      displayKeyText: true,
    },
    {
      id: "endHour",
      label: t("PAGES:FIELDS.endHour", {
        defaultValue: "Horário Fim",
      }),
      displayKeyText: true,
    },
  ];
  const fields = [
    ...fieldsMobile,

    // {
    //   id: "clientName",
    //   label: t("PAGES:HOME_PAGE.client", {
    //     defaultValue: "Cliente",
    //   }),
    //   displayKeyText: true,
    // },
    // {
    //   id: "professionalName",
    //   label: t("PAGES:HOME_PAGE.professional", {
    //     defaultValue: "Profissional",
    //   }),
    //   displayKeyText: true,
    // },
    // {
    //   id: "ownerName",
    //   label: t("PAGES:HOME_PAGE.owner", {
    //     defaultValue: "Estabelecimento",
    //   }),
    //   displayKeyText: true,
    // },
    {
      id: "statusLabel",
      label: t("PAGES:FIELDS.statusLabel", {
        defaultValue: "Status",
      }),
      displayKeyText: true,
    },
  ];
  return (
    <>
      <Box borderRadius={8} bg="secondary.500" p="4" flexGrow="1">
        <GenericTable
          deleteSelectedAction={deleteSelectedAction}
          isLoading={false}
          items={appointments}
          fields={isMobile ? fieldsMobile : fields}
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
