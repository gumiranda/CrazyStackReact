import { CategoryProps } from "entidades/category";
import { useCreateCategory } from "./createCategory.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm } from "shared/ui";

export const CreateCategoryForm = () => {
  const { formState, register, handleSubmit, handleCreateCategory, active, setActive } =
    useCreateCategory();
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateCategory)}
      title={"Criar categoria"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/categorys/1"}
    >
      <GridForm>
        <FormControl
          label="Nome da categoria"
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
