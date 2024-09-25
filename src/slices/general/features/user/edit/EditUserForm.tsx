import { UserProps } from "@/slices/general/entidades/user";
import { useEditUser } from "./editUser.hook";
import {
  BoxCreateItem,
  ControlledSelect,
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
  } = useEditUser({
    user,
    serviceList,
    ownerList,
  });
  const ControlledSelectAux = ControlledSelect as (props: any) => any;

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
      <GenericDetailsItem
        item={user}
        fields={[
          {
            id: "name",
            label: t("PAGES:FIELDS.name", {
              defaultValue: "Nome",
            }),
          },
          {
            id: "createdAt",
            label: t("PAGES:FIELDS.createdAt", {
              defaultValue: "Data de criação",
            }),
          },
          { id: "email", label: "Email" },
        ]}
      />
      <GridForm>
        <FormControl
          label={t("PAGES:FIELDS.name", {
            defaultValue: "Nome",
          })}
          error={formState.errors.name}
          {...register("name")}
        />
        <Select
          bg="primary.500"
          name="ownerList"
          label={t("PAGES:HOME_PAGE.owner", {
            defaultValue: "Estabelecimento",
          })}
          list={owners}
          value={ownerSelected}
          onChange={handleChangeOwnerSelected}
          keyValue="_id"
          keyLabel="name"
        >
          <option style={{ backgroundColor: "#7159c1" }} value="loadMore">
            {t("PAGES:NEW_APPOINTMENT.loadMore", {
              defaultValue: "Carregar mais",
            })}
          </option>
        </Select>
        <ControlledSelectAux
          isMulti
          control={control as any}
          label={t("PAGES:HOME_PAGE.servicesSelected", {
            defaultValue: "Serviços selecionados",
          })}
          placeholder="Selecione pelo menos 1 serviço"
          options={serviceOptions}
          name={"serviceOptions"}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
