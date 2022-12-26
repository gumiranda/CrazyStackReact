import { UserProps } from "entidades/user";
import { useEditUser } from "./editUser.hook";
import { BoxCreateItem, FormControl, GenericDetailsItem, GridForm } from "shared/ui";

export interface EditUserFormProps {
  user: UserProps;
}
export const EditUserForm = ({ user }: EditUserFormProps) => {
  const { formState, register, handleSubmit, handleEditUser } = useEditUser({
    user,
  });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleEditUser)}
      title={"Editar usuario"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/users/1"}
    >
      <GenericDetailsItem
        item={user}
        fields={[
          { id: "_id", label: "Id" },
          { id: "name", label: "Nome" },
          { id: "createdById", label: "Id do criador" },
          { id: "createdAt", label: "Data de criação" },
        ]}
      />
      <GridForm>
        <FormControl
          label="Nome da usuario"
          error={formState.errors.name}
          {...register("name")}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
