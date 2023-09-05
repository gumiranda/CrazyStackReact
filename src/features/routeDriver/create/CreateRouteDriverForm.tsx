import { RouteDriverProps } from "entidades/routeDriver";
import { useCreateRouteDriver } from "./createRouteDriver.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm } from "shared/ui";

export const CreateRouteDriverForm = () => {
  const { formState, register, handleSubmit, handleCreateRouteDriver, active, setActive } =
    useCreateRouteDriver();
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateRouteDriver)}
      title={"Criar corridas"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/routeDrivers/1"}
    >
      <GridForm>
        <FormControl
          label="Nome da corridas"
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
