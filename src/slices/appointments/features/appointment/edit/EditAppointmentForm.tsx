"use client";
import { AppointmentProps } from "@/slices/appointments/entidades/appointment";
import { useEditAppointment } from "./editAppointment.hook";
import { BoxCreateItem, FormControl, GenericDetailsItem, GridForm } from "@/shared/ui";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(["PAGES"]);

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
      title={t("PAGES:HOME_PAGE.editDomain", {
        defaultValue: "Editar agendamento",
        domain: t("PAGES:HOME_PAGE.appointment", {
          defaultValue: "Agendamento",
        }),
      })}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/appointments/1"}
    >
      <GenericDetailsItem
        item={appointment}
        fields={[
          { id: "_id", label: "Id" },
          { id: "message", label: "Mensagem" },
          { id: "createdById", label: "Id do criador" },
          {
            id: "createdAt",
            label: t("PAGES:FIELDS.createdAt", {
              defaultValue: "Data de criação",
            }),
          },
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
