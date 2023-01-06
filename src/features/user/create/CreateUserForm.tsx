import { GetServicesResponse } from "entidades/service";
import { useCreateUser } from "./createUser.hook";
import {
  BoxCreateItem,
  FormControl,
  Checkbox,
  GridForm,
  Select,
  ControlledSelect,
} from "shared/ui";
import { GetOwnersResponse } from "entidades/owner";
import { CreateUserFormData } from "./createUser.lib";
import { ServiceOptions } from "features/user/serviceListMultiple";

type UserCreateFormProps = {
  ownerList: GetOwnersResponse;
  serviceList: GetServicesResponse;
};
export const CreateUserForm = ({ ownerList, serviceList }: UserCreateFormProps) => {
  const {
    formState,
    register,
    handleSubmit,
    handleCreateUser,
    active,
    setActive,
    handleChangeOwnerSelected,
    owners,
    ownerSelected,
    control,
    serviceOptions,
  } = useCreateUser({ ownerList, serviceList });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateUser)}
      title={"Criar profissional"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/users/1"}
    >
      <GridForm>
        <FormControl
          label="Nome da profissional"
          error={formState.errors.name}
          {...register("name")}
        />
        <FormControl
          label="Email do profissional"
          error={formState.errors.email}
          type="email"
          {...register("email")}
        />
        <FormControl
          label="Senha do profissional"
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
          name="ownerList"
          label="Estabelecimento"
          list={owners}
          value={ownerSelected}
          onChange={handleChangeOwnerSelected}
          keyValue="_id"
          keyLabel="name"
        >
          <option style={{ backgroundColor: "#7159c1" }} value="loadMore">
            Carregar mais
          </option>
        </Select>

        <ControlledSelect<CreateUserFormData, ServiceOptions, true>
          isMulti
          control={control}
          label={"Serviços selecionados"}
          placeholder="Selecione pelo menos 1 serviço"
          options={serviceOptions}
          name={"serviceOptions"}
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
