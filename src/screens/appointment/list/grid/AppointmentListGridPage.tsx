import { InfiniteList, GenericGrid, Head } from "@/shared/ui";
import { useAppointmentInfiniteList } from "../appointmentInfiniteList.hook";
import { useAppointmentUi } from "@/entidades/appointment/appointment.ui";

export const AppointmentGridPage = () => {
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
      { id: "createdAt", label: "Data de criação", displayKeyText: true },
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
      <Head
        title={"Belezix Admin | Agendamentos"}
        description="Página de listagem de agendamentos do painel de Admin Belezix"
      />
      <InfiniteList
        hasNextPage={hasNextPage as any}
        fetchNextPage={fetchNextPage}
        entityName="agendamentos"
      >
        <GenericGrid
          items={items}
          renderItem={renderItem}
          route={"/appointments/list"}
          routeList={"/appointments/1"}
          routeCreate={"/appointments/create"}
          entityDisplayName={"Agendamento"}
          title={"Agendamentos"}
          {...appointmentGridProps}
        />
      </InfiniteList>
    </>
  );
};
