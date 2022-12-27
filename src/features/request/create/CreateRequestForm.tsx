import { RequestProps } from "entidades/request";
import { useCreateRequest } from "./createRequest.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm } from "shared/ui";

export const CreateRequestForm = () => {
  const { formState, register, handleSubmit, handleCreateRequest, active, setActive } =
    useCreateRequest();
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateRequest)}
      title={"Criar solicitação"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/requests/1"}
    >
      <GridForm>
        <FormControl
          label="Nome da solicitação"
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
