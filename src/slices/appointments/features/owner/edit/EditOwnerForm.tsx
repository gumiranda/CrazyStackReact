import { HourWorks, OwnerProps } from "@/slices/appointments/entidades/owner";
import { useEditOwner } from "./editOwner.hook";
import { BoxCreateItem, FormControl, GridForm } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { ProfilePhotoCover } from "./ProfilePhotoCover";
import { updatePlace } from "@/slices/appointments/entidades/place/place.api";
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
  const handleCoverChange = async (photoUploaded) => {
    if (owner?.place?._id) {
      await updatePlace({ cover: photoUploaded, _id: owner?.place?._id });
      return;
    }
  };
  const handleProfileChange = async (photoUploaded) => {
    if (owner?.place?._id) {
      await updatePlace({ profilephoto: photoUploaded, _id: owner?.place?._id });
      return;
    }
  };
  return (
    <>
      <ProfilePhotoCover
        coverImage={owner?.place?.cover}
        handleCoverChange={handleCoverChange}
        profileImage={owner?.place?.profilephoto}
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
          <FormControl
            label={t("PAGES:AUTH_PAGE.phone", {
              defaultValue: "Telefone",
            })}
            error={formState.errors.phone}
            labelColor="white"
            bgColor="secondary.500"
            bgColorHover="secondary.600"
            type="tel"
            mask="(__) _____-____"
            {...register("phone")}
          />{" "}
          <FormControl
            label={t("PAGES:FIELDS.address", {
              defaultValue: "Endereço",
            })}
            error={formState.errors.address}
            {...register("address")}
          />
        </GridForm>
      </BoxCreateItem>
    </>
  );
};
