import { MapRouteProps } from "entidades/mapRoute";
import { useCreateMapRoute } from "./createMapRoute.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm } from "shared/ui";

export const CreateMapRouteForm = () => {
  const {
    formState,
    register,
    handleSubmit,
    handleCreateMapRoute,
    active,
    setActive,
    originListPlaces,
    destinationListPlaces,
  } = useCreateMapRoute();
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateMapRoute)}
      title={"Criar rotas"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/mapRoutes/1"}
    >
      <GridForm>
        <FormControl
          label="Nome da rota"
          error={formState.errors.name}
          {...register("name")}
        />
        <FormControl
          label="Origem"
          error={formState.errors.originText}
          autoCompleteProps={{
            list: originListPlaces,
            placeholder: "Digite para pesquisar a origem",
          }}
          {...register("originText")}
        />
        <FormControl
          label="Destino"
          error={formState.errors.destinationText}
          autoCompleteProps={{
            list: destinationListPlaces,
            placeholder: "Digite para pesquisar a destino",
          }}
          {...register("destinationText")}
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
