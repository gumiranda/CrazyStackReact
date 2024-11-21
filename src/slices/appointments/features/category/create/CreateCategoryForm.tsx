import { CategoryProps } from "@/slices/appointments/entidades/category";
import { useCreateCategory } from "./createCategory.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export const CreateCategoryForm = () => {
  const { t } = useTranslation(["PAGES"]);
  const { formState, register, handleSubmit, handleCreateCategory, active, setActive } =
    useCreateCategory();
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateCategory)}
      title={t("PAGES:HOME_PAGE.createDomain", {
        defaultValue: "Criar categoria",
        domain: t("PAGES:HOME_PAGE.category", {
          defaultValue: "Categoria",
        }),
      })}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/categorys/1"}
    >
      <GridForm>
        <FormControl
          label={t("PAGES:FIELDS.name", {
            defaultValue: "Nome",
          })}
          error={formState.errors.name}
          {...register("name")}
        />
        <Checkbox
          label={t("PAGES:FIELDS.active", {
            defaultValue: "Ativo",
          })}
          colorPalette="green"
          checked={active}
          onChange={(e) => {
            e.preventDefault();
            setActive(e.target.checked);
          }}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
