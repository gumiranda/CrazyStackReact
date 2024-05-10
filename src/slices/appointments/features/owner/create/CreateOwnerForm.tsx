import { HourWorks } from "@/slices/appointments/entidades/owner";
import { useCreateOwner } from "./createOwner.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export const CreateOwnerForm = ({ data }) => {
  const { t } = useTranslation(["PAGES"]);
  const {
    formState,
    register,
    handleSubmit,
    handleCreateOwner,
    haveLunchTime1,
    setHaveLunchTime1,
    haveLunchTime2,
    setHaveLunchTime2,
    haveLunchTime3,
    setHaveLunchTime3,
    changeHour,
    listHours,
    hourWork,
    daysOptions1,
    daysOptions2,
    daysOptions3,
    control,
    haveAlternativeHour,
    setHaveAlternativeHour,
    haveAlternativeHour2,
    setHaveAlternativeHour2,
  } = useCreateOwner({ data });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateOwner)}
      title={t("PAGES:HOME_PAGE.createDomain", {
        defaultValue: "Criar estabelecimento",
        domain: t("PAGES:HOME_PAGE.owner", {
          defaultValue: "Estabelecimento",
        }),
      })}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/owners/1"}
    >
      <GridForm>
        <FormControl
          label={t("PAGES:FIELDS.name", {
            defaultValue: "Nome",
          })}
          error={formState.errors.name}
          {...register("name")}
        />
        <FormControl
          label={t("PAGES:FIELDS.description", {
            defaultValue: "Descrição",
          })}
          error={formState.errors.description}
          {...register("description")}
        />
        <HourWorks
          props={{
            changeHour,
            listHours,
            hourWork,
            daysOptions1,
            daysOptions2,
            daysOptions3,
            control,
            haveAlternativeHour,
            setHaveAlternativeHour,
            haveAlternativeHour2,
            setHaveAlternativeHour2,
            haveLunchTime1,
            setHaveLunchTime1,
            haveLunchTime2,
            setHaveLunchTime2,
            haveLunchTime3,
            setHaveLunchTime3,
          }}
        />
        <FormControl
          label={t("PAGES:FIELDS.timeLimit", {
            defaultValue: "Tempo limite para reagendamento/cancelamento (em minutos)",
          })}
          error={formState.errors.minimumTimeForReSchedule}
          {...register("minimumTimeForReSchedule")}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
