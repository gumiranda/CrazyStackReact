import { ServiceProps } from "@/slices/appointments/entidades/service";
import { useEditService } from "./editService.hook";
import {
  BoxCreateItem,
  FormControl,
  GenericDetailsItem,
  GridForm,
  Checkbox,
  Select,
} from "@/shared/ui";
import { GetCategorysResponse } from "@/slices/appointments/entidades/category";
import { useTranslation } from "react-i18next";
import { ProfilePhotoCover } from "../../owner/edit/ProfilePhotoCover";

export interface EditServiceFormProps {
  service: ServiceProps;
  categoryList: GetCategorysResponse;
}
export const EditServiceForm = ({ service, categoryList }: EditServiceFormProps) => {
  const { t } = useTranslation(["PAGES"]);
  const {
    formState,
    register,
    handleSubmit,
    handleEditService,
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
    categorySelected,
  } = useEditService({
    service,
    categoryList,
  });
  // const handleCoverChange = async (photoUploaded) => {
  //   if (service?._id) {
  //     await updateService({ cover: photoUploaded, _id: service?._id });
  //     return;
  //   }
  // };
  // const handleProfileChange = async (photoUploaded) => {
  //   if (service?._id) {
  //     await updateService({ photo: photoUploaded, _id: service?._id });
  //     return;
  //   }
  // };
  return (
    <>
      {/* <ProfilePhotoCover
        coverImage={service?.cover}
        handleCoverChange={handleCoverChange}
        profileImage={service?.profilephoto}
        handleProfileChange={handleProfileChange}
      /> */}
      <BoxCreateItem
        onSubmit={handleSubmit(handleEditService)}
        title={t("PAGES:HOME_PAGE.editDomain", {
          defaultValue: "Editar serviço",
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
          ></Select>
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
          <Checkbox
            colorPalette="green"
            label={t("PAGES:FIELDS.havePromotionalPrice", {
              defaultValue: "Possui preço promocional?",
            })}
            checked={havePromotionalPrice}
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
            checked={hasFidelityGenerator}
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
            checked={canPayWithFidelityPoints}
            onChange={(e) => {
              e.preventDefault();
              setCanPayWithFidelityPoints(e.target.checked);
            }}
          />
        </GridForm>
      </BoxCreateItem>
    </>
  );
};
