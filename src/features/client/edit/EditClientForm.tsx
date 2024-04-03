import { ClientProps } from "@/entidades/client";
import { useEditClient } from "./editClient.hook";
import { BoxCreateItem, FormControl, GenericDetailsItem, GridForm } from "@/shared/ui";

export interface EditClientFormProps {
  client: ClientProps;
  id: string;
  users: any;
}
export const EditClientForm = ({ client, id, users }: EditClientFormProps) => {
  const { formState, register, handleSubmit, handleEditClient } = useEditClient({
    client,
    id,
    users,
  });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleEditClient)}
      title={"Editar cliente"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/clients/1"}
    >
      <GenericDetailsItem
        item={client}
        fields={[
          { id: "_id", label: "Id" },
          { id: "name", label: "Nome" },
          { id: "createdById", label: "Id do criador" },
          { id: "createdAt", label: "Data de criação" },
        ]}
      />
      <GridForm>
        <FormControl
          label="Nome da cliente"
          error={formState.errors.name}
          {...register("name")}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
