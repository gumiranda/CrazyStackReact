import { GetServicesResponse } from "@/slices/appointments/entidades/service";
import { useCreateUser } from "./createUser.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm, Select } from "@/shared/ui";
import { GetOwnersResponse } from "@/slices/appointments/entidades/owner";
import { useTranslation } from "react-i18next";

type UserCreateFormProps = {
  ownerList: GetOwnersResponse;
  serviceList: GetServicesResponse;
};
export const CreateUserForm = ({ ownerList, serviceList }: UserCreateFormProps) => {
  const { t } = useTranslation(["PAGES"]);
  const {
    formState,
    register,
    handleSubmit,
    handleCreateUser,
    active,
    setActive,
    control,
    serviceOptions,
    handleChangeOwnerSelected,
    owners,
    ownerSelected,
    serviceIds,
    setServiceIds,
  } = useCreateUser({ ownerList, serviceList });

  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateUser)}
      title={t("PAGES:HOME_PAGE.createDomain", {
        defaultValue: "Criar profissional",
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
        <FormControl
          label={t("PAGES:FIELDS.email", {
            defaultValue: "Email",
          })}
          error={formState.errors.email}
          type="email"
          {...register("email")}
        />
        <FormControl
          label={t("PAGES:FIELDS.password", {
            defaultValue: "Senha",
          })}
          type="password"
          error={formState.errors.password}
          {...register("password")}
        />
        <FormControl
          label={t("PAGES:FIELDS.passwordConfirm", {
            defaultValue: "Confirme a senha",
          })}
          type="password"
          error={formState.errors.passwordConfirmation}
          {...register("passwordConfirmation")}
        />
        <Select
          bg="secondary.500"
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
        <Checkbox
          label={t("PAGES:FIELDS.active", {
            defaultValue: "Ativo",
          })}
          colorPalette={"tertiary"}
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
