"use client";
import { InfiniteList, GenericGrid } from "@/shared/ui";
import { useAppointmentInfiniteList } from "../appointmentInfiniteList.hook";
import { useAppointmentUi } from "@/slices/appointments/entidades/appointment/appointment.ui";
import { useTranslation } from "react-i18next";

export const AppointmentGridPage = () => {
  const { t } = useTranslation(["PAGES"]);
  const {
    isFetching,
    error,
    data: fetchData,
    fetchNextPage,
    hasNextPage,
    deleteSelectedAction,
    loading,
  } = useAppointmentInfiniteList();
  const appointmentGridProps = {
    appointments:
      fetchData?.pages
        ?.map?.((page: any) => page?.appointments)
        ?.reduce?.((a: any, b: any) => a.concat(b)) ??
      fetchData ??
      [],
    isLoading: loading,
    error,
    isFetching,
    deleteSelectedAction,
    fields: [
      { id: "message", label: "Mensagem", displayKeyText: true },
      {
        id: "createdAt",
        label: t("PAGES:FIELDS.createdAt", {
          defaultValue: "Data de criação",
        }),
        displayKeyText: true,
      },
    ],
  };
  const items =
    appointmentGridProps?.appointments?.map?.((item: any) => ({
      item,
      fields: appointmentGridProps.fields,
      mainField: "message",
    })) ?? [];
  const { renderItem } = useAppointmentUi({ deleteSelectedAction });
  return (
    <>
      <InfiniteList
        hasNextPage={hasNextPage as any}
        fetchNextPage={fetchNextPage}
        entityName={t("PAGES:HOME_PAGE.appointments", {
          defaultValue: "Agendamentos",
        })}
      >
        <GenericGrid
          items={items}
          renderItem={renderItem}
          route={"/appointments/list"}
          routeList={"/appointments/1"}
          routeCreate={"/appointments/create"}
          entityDisplayName={t("PAGES:HOME_PAGE.appointment", {
            defaultValue: "Agendamento",
          })}
          title={t("PAGES:HOME_PAGE.appointments", {
            defaultValue: "Agendamentos",
          })}
          {...appointmentGridProps}
        />
      </InfiniteList>
    </>
  );
};
