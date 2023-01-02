import { ServiceProps } from "entidades/service";
import { useCreateService } from "./createService.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm } from "shared/ui";

export const CreateServiceForm = () => {
  const { formState, register, handleSubmit, handleCreateService, active, setActive } =
    useCreateService();
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateService)}
      title={"Criar serviço"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/services/1"}
    >
      <GridForm>
        <FormControl
          label="Nome da serviço"
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
