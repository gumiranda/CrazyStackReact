import { AppointmentProps } from "@/entidades/appointment";
import { useEditAppointment } from "./editAppointment.hook";
import { BoxCreateItem, FormControl, GenericDetailsItem, GridForm } from "@/shared/ui";

export interface EditAppointmentFormProps {
  appointment: AppointmentProps;
  id: string;
  owners: any;
}
export const EditAppointmentForm = ({
  appointment,
  id,
  owners,
}: EditAppointmentFormProps) => {
  const { formState, register, handleSubmit, handleEditAppointment } = useEditAppointment(
    {
      appointment,
      id,
      owners,
    }
  );
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
          { id: "message", label: "Mensagem" },
          { id: "createdById", label: "Id do criador" },
          { id: "createdAt", label: "Data de criação" },
        ]}
      />
      <GridForm>
        <FormControl
          label="Mensagem do agendamento"
          error={formState.errors.message}
          {...register("message")}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
