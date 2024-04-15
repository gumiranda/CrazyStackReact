import { CategoryProps } from "@/entidades/category";
import { useEditCategory } from "./editCategory.hook";
import { BoxCreateItem, FormControl, GenericDetailsItem, GridForm } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export interface EditCategoryFormProps {
  category: CategoryProps;
}
export const EditCategoryForm = ({ category }: EditCategoryFormProps) => {
  const { t } = useTranslation(["PAGES"]);
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
          {
            id: "name",
            label: t("PAGES:FIELDS.name", {
              defaultValue: "Nome",
            }),
          },
          { id: "createdById", label: "Id do criador" },
          {
            id: "createdAt",
            label: t("PAGES:FIELDS.createdAt", {
              defaultValue: "Data de criação",
            }),
          },
        ]}
      />
      <GridForm>
        <FormControl
          label={t("PAGES:FIELDS.name", {
            defaultValue: "Nome",
          })}
          error={formState.errors.name}
          {...register("name")}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
