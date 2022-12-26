import { UserProps } from "entidades/user";
import { useCreateUser } from "./createUser.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm } from "shared/ui";

export const CreateUserForm = () => {
  const { formState, register, handleSubmit, handleCreateUser, active, setActive } =
    useCreateUser();
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateUser)}
      title={"Criar usuario"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/users/1"}
    >
      <GridForm>
        <FormControl
          label="Nome da usuario"
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
