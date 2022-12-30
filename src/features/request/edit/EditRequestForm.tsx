import { RequestProps } from "entidades/request";
import { useEditRequest } from "./editRequest.hook";
import { BoxCreateItem, FormControl, GenericDetailsItem, GridForm } from "shared/ui";

export interface EditRequestFormProps {
  request: RequestProps;
}
export const EditRequestForm = ({ request }: EditRequestFormProps) => {
  const { formState, register, handleSubmit, handleEditRequest } = useEditRequest({
    request,
  });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleEditRequest)}
      title={"Editar solicitação"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/requests/1"}
    >
      <GenericDetailsItem
        item={request}
        fields={[
          { id: "_id", label: "Id" },
          { id: "message", label: "Nome" },
          { id: "createdById", label: "Id do criador" },
          { id: "createdAt", label: "Data de criação" },
        ]}
      />
      <GridForm>
        <FormControl
          label="Nome da solicitação"
          error={formState.errors.message}
          {...register("message")}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
