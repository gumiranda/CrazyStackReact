import { RequestProps } from "entidades/request";
import { useEditRequest } from "./editRequest.hook";
import {
  BoxCreateItem,
  FormControl,
  GenericDetailsItem,
  GridForm,
  Select,
} from "shared/ui";
import { statusArray } from "entidades/request/request.model";

export interface EditRequestFormProps {
  request: RequestProps;
}
export const EditRequestForm = ({ request }: EditRequestFormProps) => {
  const {
    formState,
    register,
    handleSubmit,
    handleEditRequest,
    statusSelected,
    handleChangeStatus,
  } = useEditRequest({
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
          { id: "message", label: "Obs" },
          { id: "statusLabel", label: "Status da solicitação" },
          { id: "createdById", label: "Id do criador" },
          { id: "createdAt", label: "Data de criação" },
        ]}
      />
      <GridForm>
        <Select
          bg="purple.700"
          name="statusList"
          label="Status da solicitação"
          list={statusArray}
          value={statusSelected}
          onChange={handleChangeStatus}
          keyValue="key"
          keyLabel="value"
        />
        <FormControl
          label="Obs da solicitação"
          error={formState.errors.message}
          {...register("message")}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
