import { GetUsersResponse } from "@/entidades/user";
import { useCreateClient } from "./createClient.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm, Select } from "@/shared/ui";
export type ClientCreateFormProps = {
  userList: GetUsersResponse;
};
export const CreateClientForm = ({ userList }: ClientCreateFormProps) => {
  const {
    formState,
    register,
    handleSubmit,
    handleCreateClient,
    active,
    setActive,
    userSelected,
    handleChangeUserSelected,
    users,
  } = useCreateClient({ userList });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateClient)}
      title={"Criar cliente"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/clients/1"}
    >
      <GridForm>
        <FormControl
          label="Nome do(a) cliente"
          error={formState.errors.name}
          {...register("name")}
        />
        <FormControl
          label="Telefone"
          error={formState.errors.phone}
          labelColor="white"
          bgColor="secondary.500"
          bgColorHover="secondary.600"
          type="tel"
          mask="(99) 99999-9999"
          {...register("phone")}
        />
        <Select
          bg="secondary.600"
          name="clientList"
          label="Usuário associado ao cliente"
          list={users}
          value={userSelected}
          onChange={handleChangeUserSelected}
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
