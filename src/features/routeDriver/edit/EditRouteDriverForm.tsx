import { RouteDriverProps } from "@/entidades/routeDriver";
import { useEditRouteDriver } from "./editRouteDriver.hook";
import { BoxCreateItem, FormControl, GenericDetailsItem, GridForm } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export interface EditRouteDriverFormProps {
  routeDriver: RouteDriverProps;
}
export const EditRouteDriverForm = ({ routeDriver }: EditRouteDriverFormProps) => {
  const { t } = useTranslation(["PAGES"]);
  const { formState, register, handleSubmit, handleEditRouteDriver } = useEditRouteDriver(
    {
      routeDriver,
    }
  );
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleEditRouteDriver)}
      title={t("PAGES:HOME_PAGE.editDomain", {
        defaultValue: "Editar corrida",
        domain: t("PAGES:HOME_PAGE.ride", {
          defaultValue: "Corrida",
        }),
      })}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/routeDrivers/1"}
    >
      <GenericDetailsItem
        item={routeDriver}
        fields={[
          { id: "_id", label: "Id" },
          {
            id: "name",
            label: t("PAGES:FIELDS.name", {
              defaultValue: "Nome",
            }),
          },
          { id: "createdById", label: "Id do criador" },
          {
            id: "createdAt",
            label: t("PAGES:FIELDS.createdAt", {
              defaultValue: "Data de criação",
            }),
          },
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
        <FormControl
          label="Status da corrida"
          error={formState.errors.status}
          {...register("status")}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
