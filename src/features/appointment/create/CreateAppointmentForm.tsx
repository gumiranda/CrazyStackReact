import { AppointmentProps } from "@/entidades/appointment";
import { useCreateAppointment } from "./createAppointment.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm } from "@/shared/ui";

export const CreateAppointmentForm = ({ data }) => {
  const {
    formState,
    register,
    handleSubmit,
    handleCreateAppointment,
    active,
    setActive,
  } = useCreateAppointment({ data });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateAppointment)}
      title={"Criar agendamento"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/appointments/1"}
    >
      <GridForm>
        <FormControl
          label="Nome da agendamento"
          error={formState.errors.name}
          {...register("name")}
        />
        <Checkbox
          label="Ativo"
          colorScheme="green"
          isChecked={active}
          onChange={(e) => {
            e.preventDefault();
            setActive(e.target.checked);
          }}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
