import { AppointmentProps } from "@/slices/appointments/entidades/appointment";
import { useCreateAppointment } from "./createAppointment.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export const CreateAppointmentForm = ({ data }) => {
  const { t } = useTranslation(["PAGES"]);
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
      title={t("PAGES:HOME_PAGE.createDomain", {
        defaultValue: "Criar agendamento",
        domain: t("PAGES:HOME_PAGE.appointment", {
          defaultValue: "Agendamento",
        }),
      })}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/appointments/1"}
    >
      <GridForm>
        <FormControl
          label={t("PAGES:FIELDS.name", {
            defaultValue: "Nome",
          })}
          error={formState.errors.name}
          {...register("name")}
        />
        <Checkbox
          label={t("PAGES:FIELDS.active", {
            defaultValue: "Ativo",
          })}
          colorPalette="green"
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
