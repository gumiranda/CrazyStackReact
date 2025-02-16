import { HourWorks, OwnerProps } from "@/slices/appointments/entidades/owner";
import { useEditOwner } from "./editOwner.hook";
import { BoxCreateItem, FormControl, GridForm } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { ProfilePhotoCover } from "./ProfilePhotoCover";

export interface EditOwnerFormProps {
  owner: OwnerProps;
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
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };
  const profileImage =
    "https://images.unsplash.com/photo-1619367901998-73b3a70b3898?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const coverImage =
    "https://images.unsplash.com/photo-1619367901998-73b3a70b3898?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <>
      <ProfilePhotoCover
        coverImage={coverImage}
        handleCoverChange={handleCoverChange}
        profileImage={profileImage}
        handleProfileChange={handleProfileChange}
      />

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
    </>
  );
};
