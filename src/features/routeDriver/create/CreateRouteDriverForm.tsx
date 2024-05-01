import { useCreateRouteDriver } from "./createRouteDriver.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export const CreateRouteDriverForm = () => {
  const { t } = useTranslation(["PAGES"]);
  const {
    formState,
    register,
    handleSubmit,
    handleCreateRouteDriver,
    active,
    setActive,
  } = useCreateRouteDriver();
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateRouteDriver)}
      title={t("PAGES:HOME_PAGE.createDomain", {
        defaultValue: "Criar corrida",
        domain: t("PAGES:HOME_PAGE.ride", {
          defaultValue: "Corrida",
        }),
      })}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/routeDrivers/1"}
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
          label="Id da rota"
          error={formState.errors.routeId}
          {...register("routeId")}
        />
        <Checkbox
          label={t("PAGES:FIELDS.active", {
            defaultValue: "Ativo",
          })}
          colorScheme="green"
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
