import { HourWorks, OwnerProps } from "@/slices/appointments/entidades/owner";
import { useEditOwner } from "./editOwner.hook";
import { BoxCreateItem, FormControl, Grid, GridForm } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { ProfilePhotoCover } from "./ProfilePhotoCover";
import { updatePlace } from "@/slices/appointments/entidades/place/place.api";
import type { OwnerPlaceProps } from "@/slices/appointments/entidades/owner/owner.model";
import { useRef } from "react";
import { useHandleLocation } from "../../mapRoute/hooks";

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
    addressText,
    setValue,
    originSelectedValue,
    coordObject,
    setOriginSelectedValue,
  } = useEditOwner({
    owner,
    users,
    id,
  });
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const { originListPlaces } = useHandleLocation({
    originText: addressText || "",
    destinationText: "",
    mapContainerRef,
    originSelectedValue,
    destinationSelectedValue: null,
    coordObject,
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
          {originListPlaces && (
            <FormControl
              label="Endereço"
              bgColor="secondary.500"
              color="white"
              labelColor="white"
              error={formState.errors.address}
              autoCompleteProps={{
                defaultsuggestionsOpen: originListPlaces?.length > 0,
                list: originListPlaces,
                placeholder: "Digite para pesquisar a origem",
                listItemStyleProps: {
                  bgColor: "gray.800",
                  color: "white",
                  onClick: ({ value }) => {
                    setOriginSelectedValue(value);
                    if (value?.length > 0) {
                      const origin = originListPlaces?.find?.(
                        (item: any) => item?.value === value
                      ) as any;
                      if (origin) {
                        setValue("address", origin?.label);
                        setValue("coord", origin?.location);
                      }
                    }
                  },
                },
                highlightItemBg: "gray.200",
              }}
              {...register("address")}
            />
          )}
        </GridForm>
      </BoxCreateItem>
      <Grid id="map" p={40} ref={mapContainerRef}></Grid>
    </>
  );
};
