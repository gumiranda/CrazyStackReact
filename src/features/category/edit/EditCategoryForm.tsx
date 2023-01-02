import { CategoryProps } from "entidades/category";
import { useEditCategory } from "./editCategory.hook";
import { BoxCreateItem, FormControl, GenericDetailsItem, GridForm } from "shared/ui";

export interface EditCategoryFormProps {
  category: CategoryProps;
}
export const EditCategoryForm = ({ category }: EditCategoryFormProps) => {
  const { formState, register, handleSubmit, handleEditCategory } = useEditCategory({
    category,
  });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleEditCategory)}
      title={"Editar categoria"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/categorys/1"}
    >
      <GenericDetailsItem
        item={category}
        fields={[
          { id: "_id", label: "Id" },
          { id: "name", label: "Nome" },
          { id: "createdById", label: "Id do criador" },
          { id: "createdAt", label: "Data de criação" },
        ]}
      />
      <GridForm>
        <FormControl
          label="Nome da categoria"
          error={formState.errors.name}
          {...register("name")}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
