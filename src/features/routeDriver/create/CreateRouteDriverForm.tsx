import { RouteDriverProps } from "entidades/routeDriver";
import { useCreateRouteDriver } from "./createRouteDriver.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm } from "shared/ui";

export const CreateRouteDriverForm = () => {
  const { formState, register, handleSubmit, handleCreateRouteDriver, active, setActive } =
    useCreateRouteDriver();
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateRouteDriver)}
      title={"Criar corrida"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/routeDrivers/1"}
    >
      <GridForm>
        <FormControl
          label="Nome da corrida"
          error={formState.errors.name}
          {...register("name")}
        />
        <FormControl
          label="Id da rota"
          error={formState.errors.routeId}
          {...register("routeId")}
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
