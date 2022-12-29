import { AppointmentProps } from "entidades/appointment";
import { useEditAppointment } from "./editAppointment.hook";
import { BoxCreateItem, FormControl, GenericDetailsItem, GridForm } from "shared/ui";

export interface EditAppointmentFormProps {
  appointment: AppointmentProps;
}
export const EditAppointmentForm = ({ appointment }: EditAppointmentFormProps) => {
  const { formState, register, handleSubmit, handleEditAppointment } = useEditAppointment({
    appointment,
  });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleEditAppointment)}
      title={"Editar agendamento"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/appointments/1"}
    >
      <GenericDetailsItem
        item={appointment}
        fields={[
          { id: "_id", label: "Id" },
          { id: "name", label: "Nome" },
          { id: "createdById", label: "Id do criador" },
          { id: "createdAt", label: "Data de criação" },
        ]}
      />
      <GridForm>
        <FormControl
          label="Nome da agendamento"
          error={formState.errors.name}
          {...register("name")}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
