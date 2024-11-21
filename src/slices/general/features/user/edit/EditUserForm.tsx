import { UserProps } from "@/slices/general/entidades/user";
import { useEditUser } from "./editUser.hook";
import {
  BoxCreateItem,
  FormControl,
  GenericDetailsItem,
  GridForm,
  Select,
} from "@/shared/ui";
import { GetServicesResponse } from "@/slices/appointments/entidades/service";
import { GetOwnersResponse } from "@/slices/appointments/entidades/owner";
import { ServiceOptions } from "@/slices/general/features/user/serviceListMultiple";
import { EditUserFormData } from "./editUser.lib";
import { useTranslation } from "react-i18next";
export interface EditUserFormProps {
  user: UserProps;
  serviceList: GetServicesResponse;
  ownerList: GetOwnersResponse;
}
export const EditUserForm = ({ user, serviceList, ownerList }: EditUserFormProps) => {
  const { t } = useTranslation(["PAGES"]);
  const {
    formState,
    register,
    handleSubmit,
    handleEditUser,
    serviceOptions,
    control,
    handleChangeOwnerSelected,
    owners,
    ownerSelected,
    serviceIds,
    setServiceIds,
  } = useEditUser({
    user,
    serviceList,
    ownerList,
  });

  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleEditUser)}
      title={t("PAGES:HOME_PAGE.editDomain", {
        defaultValue: "Editar profissional",
        domain: t("PAGES:HOME_PAGE.professional", {
          defaultValue: "Profissional",
        }),
      })}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/users/1"}
    >
      <GridForm>
        <FormControl
          label={t("PAGES:FIELDS.name", {
            defaultValue: "Nome",
          })}
          error={formState.errors.name}
          {...register("name")}
        />
        <Select
          name="ownerList"
          label={t("PAGES:HOME_PAGE.owner", {
            defaultValue: "Estabelecimento",
          })}
          list={owners}
          value={ownerSelected}
          onChange={handleChangeOwnerSelected}
          keyValue="_id"
          keyLabel="name"
        ></Select>
        <Select
          multiple
          control={control as any}
          label={t("PAGES:HOME_PAGE.servicesSelected", {
            defaultValue: "Serviços selecionados",
          })}
          placeholder="Selecione pelo menos 1 serviço"
          list={serviceOptions}
          name={"serviceOptions"}
          keyValue="value"
          keyLabel="label"
          value={serviceIds}
          onChange={(e) => setServiceIds(e.target.value)}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
