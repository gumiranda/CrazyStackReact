import { ClientProps } from "entidades/client";
import { useCreateClient } from "./createClient.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm } from "shared/ui";

export const CreateClientForm = () => {
  const { formState, register, handleSubmit, handleCreateClient, active, setActive } =
    useCreateClient();
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateClient)}
      title={"Criar cliente"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/clients/1"}
    >
      <GridForm>
        <FormControl
          label="Nome da cliente"
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
