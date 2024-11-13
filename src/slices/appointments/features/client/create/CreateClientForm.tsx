import { GetUsersResponse } from "@/slices/general/entidades/user";
import { useCreateClient } from "./createClient.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm, Select } from "@/shared/ui";
import { useTranslation } from "react-i18next";
export type ClientCreateFormProps = {
  userList: GetUsersResponse;
  owners: any;
};
export const CreateClientForm = ({ userList, owners }: ClientCreateFormProps) => {
  const { t } = useTranslation(["PAGES"]);
  const {
    formState,
    register,
    handleSubmit,
    handleCreateClient,
    active,
    setActive,
    userSelected,
    handleChangeUserSelected,
    users,
  } = useCreateClient({ userList, owners });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateClient)}
      title={t("PAGES:HOME_PAGE.createDomain", {
        defaultValue: "Criar cliente",
        domain: t("PAGES:HOME_PAGE.client", {
          defaultValue: "Cliente",
        }),
      })}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/clients/1"}
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
        />
        <Select
          bg="secondary.500"
          name="clientList"
          label={t("PAGES:AUTH_PAGE.userAssociatedToClient", {
            defaultValue: "Usuário associado ao cliente",
          })}
          list={users}
          value={userSelected}
          onChange={handleChangeUserSelected}
          keyValue="_id"
          keyLabel="name"
        >
          <option style={{ backgroundColor: "#7159c1" }} value="loadMore">
            {t("PAGES:NEW_APPOINTMENT.loadMore", {
              defaultValue: "Carregar mais",
            })}
          </option>
        </Select>
        <Checkbox
          label={t("PAGES:FIELDS.active", {
            defaultValue: "Ativo",
          })}
          colorPalette="green"
          checked={active}
          onChange={(e) => {
            e.preventDefault();
            setActive(e.target.checked);
          }}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
