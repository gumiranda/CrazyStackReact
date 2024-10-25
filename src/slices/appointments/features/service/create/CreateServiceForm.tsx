import { useCreateService } from "./createService.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm, Select } from "@/shared/ui";
import { GetCategorysResponse } from "@/slices/appointments/entidades/category";
import { useTranslation } from "react-i18next";
export type CreateServiceFormProps = {
  categoryList: GetCategorysResponse;
};
export const CreateServiceForm = ({ categoryList }: CreateServiceFormProps) => {
  const { t } = useTranslation(["PAGES"]);
  const {
    categorySelected,
    setCategorySelected,
    formState,
    register,
    handleSubmit,
    handleCreateService,
    active,
    setActive,
    handleChangeCategorySelected,
    categorys,
    havePromotionalPrice,
    hasFidelityGenerator,
    canPayWithFidelityPoints,
    setHavePromotionalPrice,
    setHasFidelityGenerator,
    setCanPayWithFidelityPoints,
  } = useCreateService({ categoryList });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateService)}
      title={t("PAGES:HOME_PAGE.createDomain", {
        defaultValue: "Criar serviço",
        domain: t("PAGES:HOME_PAGE.service", {
          defaultValue: "Serviço",
        }),
      })}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/services/1"}
    >
      <GridForm>
        <FormControl
          label={t("PAGES:FIELDS.name", {
            defaultValue: "Nome",
          })}
          error={formState.errors.name}
          {...register("name")}
        />
        <FormControl
          label={t("PAGES:FIELDS.description", {
            defaultValue: "Descrição",
          })}
          error={formState.errors.description}
          {...register("description")}
        />
        <FormControl
          label={t("PAGES:FIELDS.price", {
            defaultValue: "Preço promocional",
          })}
          error={formState.errors.price}
          {...register("price")}
        />
        <FormControl
          label={t("PAGES:FIELDS.finalPrice", {
            defaultValue: "Preço do serviço",
          })}
          error={formState.errors.finalPrice}
          {...register("finalPrice")}
        />
        <FormControl
          label={t("PAGES:FIELDS.durationOfService", {
            defaultValue: "Duração do serviço (em min)",
          })}
          type={"number"}
          error={formState.errors.duration}
          {...register("duration")}
        />
        <FormControl
          label={t("PAGES:FIELDS.productsQuantityNeeded", {
            defaultValue: "Quantidade de produtos necessários",
          })}
          type={"number"}
          error={formState.errors.productsQuantityNeeded}
          {...register("productsQuantityNeeded")}
        />
        <FormControl
          label={t("PAGES:FIELDS.comission", {
            defaultValue: "Comissão",
          })}
          type={"number"}
          error={formState.errors.comission}
          {...register("comission")}
        />
        <Select
          bg="secondary.600"
          name="categoryList"
          label={t("PAGES:HOME_PAGE.category", {
            defaultValue: "Categoria",
          })}
          list={categorys}
          value={categorySelected}
          onChange={handleChangeCategorySelected}
          keyValue="_id"
          keyLabel="name"
        >
          <option style={{ backgroundColor: "#7159c1" }} value="loadMore">
            {t("PAGES:NEW_APPOINTMENT.loadMore", {
              defaultValue: "Carregar mais",
            })}
          </option>
        </Select>
        <Checkbox
          label={t("PAGES:FIELDS.active", {
            defaultValue: "Ativo",
          })}
          colorPalette="green"
          isChecked={active}
          onChange={(e) => {
            e.preventDefault();
            setActive(e.target.checked);
          }}
        />
        <Checkbox
          colorPalette="green"
          label={t("PAGES:FIELDS.havePromotionalPrice", {
            defaultValue: "Possui preço promocional?",
          })}
          isChecked={havePromotionalPrice}
          onChange={(e) => {
            e.preventDefault();
            setHavePromotionalPrice(e.target.checked);
          }}
        />
        <Checkbox
          colorPalette="green"
          label={t("PAGES:FIELDS.hasFidelityGenerator", {
            defaultValue: "Gera pontos de fidelidade?",
          })}
          isChecked={hasFidelityGenerator}
          onChange={(e) => {
            e.preventDefault();
            setHasFidelityGenerator(e.target.checked);
          }}
        />
        <Checkbox
          colorPalette="green"
          label={t("PAGES:FIELDS.canPayWithFidelityPoints", {
            defaultValue: "Pontos de fidelidade podem ser usados na compra?",
          })}
          isChecked={canPayWithFidelityPoints}
          onChange={(e) => {
            e.preventDefault();
            setCanPayWithFidelityPoints(e.target.checked);
          }}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
