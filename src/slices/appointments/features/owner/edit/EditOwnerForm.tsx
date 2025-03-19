import { HourWorks } from "@/slices/appointments/entidades/owner";
import { useEditOwner } from "./editOwner.hook";
import { BoxCreateItem, FormControl, GenericDetailsItem, GridForm } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import type { OwnerPlaceProps } from "@/slices/appointments/entidades/owner/owner.model";

export interface EditOwnerFormProps {
  owner: OwnerPlaceProps;
  id: string;
  users: any;
}
export const EditOwnerForm = ({ owner, id, users }: EditOwnerFormProps) => {
  const { t } = useTranslation(["PAGES"]);
  const {
    formState,
    register,
    handleSubmit,
    handleEditOwner,
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
    daysOptionsSelected1,
    daysOptionsSelected2,
    daysOptionsSelected3,
  } = useEditOwner({
    owner,
    users,
    id,
  });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleEditOwner)}
      title={t("PAGES:HOME_PAGE.editDomain", {
        defaultValue: "Editar estabelecimento",
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
            daysOptionsSelected1,
            daysOptionsSelected2,
            daysOptionsSelected3,
          }}
        />
        <FormControl
          label="Tempo limite para reagendamento/cancelamento (em minutos)"
          error={formState.errors.minimumTimeForReSchedule}
          {...register("minimumTimeForReSchedule")}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
