import { MapRouteProps } from "entidades/mapRoute";
import { useCreateMapRoute } from "./createMapRoute.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm } from "shared/ui";

export const CreateMapRouteForm = () => {
  const { formState, register, handleSubmit, handleCreateMapRoute, active, setActive } =
    useCreateMapRoute();
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateMapRoute)}
      title={"Criar rota"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/mapRoutes/1"}
    >
      <GridForm>
        <FormControl
          label="Nome da rota"
          error={formState.errors.name}
          {...register("name")}
        />
        <Checkbox
          label="Ativo"
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
