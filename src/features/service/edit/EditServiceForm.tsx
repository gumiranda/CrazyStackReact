import { ServiceProps } from "entidades/service";
import { useEditService } from "./editService.hook";
import {
  BoxCreateItem,
  FormControl,
  GenericDetailsItem,
  GridForm,
  Checkbox,
  Select,
} from "shared/ui";
import { GetCategorysResponse } from "entidades/category";

export interface EditServiceFormProps {
  service: ServiceProps;
  categoryList: GetCategorysResponse;
}
export const EditServiceForm = ({ service, categoryList }: EditServiceFormProps) => {
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
          label="Nome do serviço"
          error={formState.errors.name}
          {...register("name")}
        />
        <FormControl
          label="Descrição do serviço"
          error={formState.errors.description}
          {...register("description")}
        />
        <FormControl
          label="Preço promocional"
          type={"number"}
          error={formState.errors.price}
          {...register("price")}
        />
        <FormControl
          label="Preço do serviço"
          type={"number"}
          error={formState.errors.finalPrice}
          {...register("finalPrice")}
        />
        <FormControl
          label="Duração do serviço (em min)"
          type={"number"}
          error={formState.errors.duration}
          {...register("duration")}
        />
        <FormControl
          label="Quantidade de Produtos"
          type={"number"}
          error={formState.errors.productsQuantityNeeded}
          {...register("productsQuantityNeeded")}
        />
        <FormControl
          label="Comissão"
          type={"number"}
          error={formState.errors.comission}
          {...register("comission")}
        />
        <Select
          bg="purple.700"
          name="categoryList"
          label="Categoria"
          list={categorys}
          value={categorySelected}
          onChange={handleChangeCategorySelected}
          keyValue="_id"
          keyLabel="name"
        >
          <option style={{ backgroundColor: "#7159c1" }} value="loadMore">
            Carregar mais
          </option>
        </Select>
        <Checkbox
          label="Ativo"
          colorScheme="green"
          isChecked={active}
          onChange={(e) => {
            e.preventDefault();
            setActive(e.target.checked);
          }}
        />
        <Checkbox
          colorScheme="green"
          label={"Possui preço promocional"}
          isChecked={havePromotionalPrice}
          onChange={(e) => {
            e.preventDefault();
            setHavePromotionalPrice(e.target.checked);
          }}
        />
        <Checkbox
          colorScheme="green"
          label={"Gera pontos de fidelidade"}
          isChecked={hasFidelityGenerator}
          onChange={(e) => {
            e.preventDefault();
            setHasFidelityGenerator(e.target.checked);
          }}
        />
        <Checkbox
          colorScheme="green"
          label={"Pontos de fidelidade podem ser usados na compra?"}
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
