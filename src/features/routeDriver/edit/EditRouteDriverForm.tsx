import { RouteDriverProps } from "entidades/routeDriver";
import { useEditRouteDriver } from "./editRouteDriver.hook";
import { BoxCreateItem, FormControl, GenericDetailsItem, GridForm } from "shared/ui";

export interface EditRouteDriverFormProps {
  routeDriver: RouteDriverProps;
}
export const EditRouteDriverForm = ({ routeDriver }: EditRouteDriverFormProps) => {
  const { formState, register, handleSubmit, handleEditRouteDriver } = useEditRouteDriver({
    routeDriver,
  });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleEditRouteDriver)}
      title={"Editar corrida"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/routeDrivers/1"}
    >
      <GenericDetailsItem
        item={ routeDriver }
        fields={[
          { id: "_id", label: "Id" },
          { id: "name", label: "Nome" },
          { id: "createdById", label: "Id do criador" },
          { id: "createdAt", label: "Data de criação" },
        ]}
      />
      <GridForm>
        <FormControl
          label="Nome da corrida"
          error={formState.errors.name}
          {...register("name")}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
