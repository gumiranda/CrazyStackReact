import { useCreateUser } from "./createUser.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm, Select } from "shared/ui";
import { GetServicesResponse } from "entidades/service";
type CreateUserFormProps = {
  serviceList: GetServicesResponse;
};
export const CreateUserForm = ({ serviceList }: CreateUserFormProps) => {
  const {
    formState,
    register,
    handleSubmit,
    handleCreateUser,
    active,
    setActive,
    handleChangeServiceSelected,
    services,
    serviceSelected,
  } = useCreateUser({ serviceList });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateUser)}
      title={"Criar usuario"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/users/1"}
    >
      <GridForm>
        <FormControl
          label="Nome do usuario"
          error={formState.errors.name}
          {...register("name")}
        />
        <FormControl
          label="Email do usuario"
          error={formState.errors.email}
          type="email"
          {...register("email")}
        />
        <FormControl
          label="Senha do usuario"
          type="password"
          error={formState.errors.password}
          {...register("password")}
        />
        <FormControl
          label="Confirme a senha"
          type="password"
          error={formState.errors.passwordConfirmation}
          {...register("passwordConfirmation")}
        />
        <Select
          bg="purple.700"
          name="serviceList"
          label="Serviço"
          list={services}
          value={serviceSelected}
          onChange={handleChangeServiceSelected}
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
