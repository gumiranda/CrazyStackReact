import { OwnerProps } from "entidades/owner";
import { useEditOwner } from "./editOwner.hook";
import { BoxCreateItem, FormControl, GenericDetailsItem, GridForm } from "shared/ui";

export interface EditOwnerFormProps {
  owner: OwnerProps;
}
export const EditOwnerForm = ({ owner }: EditOwnerFormProps) => {
  const { formState, register, handleSubmit, handleEditOwner } = useEditOwner({
    owner,
  });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleEditOwner)}
      title={"Editar dono"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/owners/1"}
    >
      <GenericDetailsItem
        item={owner}
        fields={[
          { id: "_id", label: "Id" },
          { id: "name", label: "Nome" },
          { id: "createdById", label: "Id do criador" },
          { id: "createdAt", label: "Data de criação" },
        ]}
      />
      <GridForm>
        <FormControl
          label="Nome da dono"
          error={formState.errors.name}
          {...register("name")}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
