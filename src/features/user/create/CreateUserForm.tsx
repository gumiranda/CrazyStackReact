import { GetServicesResponse } from "@/entidades/service";
import { useCreateUser } from "./createUser.hook";
import {
  BoxCreateItem,
  FormControl,
  Checkbox,
  GridForm,
  Select,
  ControlledSelect,
} from "@/shared/ui";
import { GetOwnersResponse } from "@/entidades/owner";
import { CreateUserFormData } from "./createUser.lib";
import { ServiceOptions } from "@/features/user/serviceListMultiple";

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
    control,
    serviceOptions,
    handleChangeOwnerSelected,
    owners,
    ownerSelected,
  } = useCreateUser({ ownerList, serviceList });
  const ControlledSelectAux = ControlledSelect as (props: any) => any;

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
          bg="primary.500"
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

        <ControlledSelectAux
          isMulti
          control={control as any}
          label="Serviços selecionados"
          placeholder="Selecione os serviços"
          options={serviceOptions}
          name={"serviceOptions"}
        />

        <Checkbox
          label="Ativo"
          colorScheme={"tertiary"}
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
