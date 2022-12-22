import { useCreateService } from "./createService.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm, Select } from "shared/ui";
import { GetCategorysResponse } from "entidades/category";
export type CreateServiceFormProps = {
  categoryList: GetCategorysResponse;
};
export const CreateServiceForm = ({ categoryList }: CreateServiceFormProps) => {
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
  } = useCreateService({ categoryList });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateService)}
      title={"Criar serviço"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/services/1"}
    >
      <GridForm>
        <FormControl
          label="Nome do serviço"
          error={formState.errors.name}
          {...register("name")}
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
      </GridForm>
    </BoxCreateItem>
  );
};
