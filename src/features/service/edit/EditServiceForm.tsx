import { ServiceProps } from "entidades/service";
import { useEditService } from "./editService.hook";
import { BoxCreateItem, FormControl, GenericDetailsItem, GridForm } from "shared/ui";

export interface EditServiceFormProps {
  service: ServiceProps;
}
export const EditServiceForm = ({ service }: EditServiceFormProps) => {
  const { formState, register, handleSubmit, handleEditService } = useEditService({
    service,
  });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleEditService)}
      title={"Editar serviço"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/services/1"}
    >
      <GenericDetailsItem
        item={service}
        fields={[
          { id: "_id", label: "Id" },
          { id: "name", label: "Nome" },
          { id: "createdById", label: "Id do criador" },
          { id: "createdAt", label: "Data de criação" },
        ]}
      />
      <GridForm>
        <FormControl
          label="Nome da serviço"
          error={formState.errors.name}
          {...register("name")}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
