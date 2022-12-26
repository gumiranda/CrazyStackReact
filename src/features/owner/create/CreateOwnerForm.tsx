import { OwnerProps } from "entidades/owner";
import { useCreateOwner } from "./createOwner.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm } from "shared/ui";

export const CreateOwnerForm = () => {
  const { formState, register, handleSubmit, handleCreateOwner, active, setActive } =
    useCreateOwner();
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateOwner)}
      title={"Criar estabelecimento"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/owners/1"}
    >
      <GridForm>
        <FormControl
          label="Nome do estabelecimento"
          error={formState.errors.name}
          {...register("name")}
        />
        <FormControl
          label="Descrição do estabelecimento"
          error={formState.errors.description}
          {...register("description")}
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
