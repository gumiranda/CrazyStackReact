import { MapRouteProps } from "entidades/mapRoute";
import { useEditMapRoute } from "./editMapRoute.hook";
import { BoxCreateItem, FormControl, GenericDetailsItem, GridForm } from "shared/ui";

export interface EditMapRouteFormProps {
  mapRoute: MapRouteProps;
}
export const EditMapRouteForm = ({ mapRoute }: EditMapRouteFormProps) => {
  const { formState, register, handleSubmit, handleEditMapRoute } = useEditMapRoute({
    mapRoute,
  });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleEditMapRoute)}
      title={"Editar rotas"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/mapRoutes/1"}
    >
      <GenericDetailsItem
        item={mapRoute}
        fields={[
          { id: "_id", label: "Id" },
          { id: "name", label: "Nome" },
          { id: "distance", label: "Distância (em metros)" },
          { id: "source", subId: "name", label: "Origem" },
          { id: "destination", subId: "name", label: "Destino" },
          { id: "createdById", label: "Id do criador" },
          { id: "createdAt", label: "Data de criação" },
        ]}
      />
      <GridForm>
        <FormControl
          label="Nome da rotas"
          error={formState.errors.name}
          {...register("name")}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
