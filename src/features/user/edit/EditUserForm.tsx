import { UserProps } from "entidades/user";
import { useEditUser } from "./editUser.hook";
import {
  BoxCreateItem,
  ControlledSelect,
  FormControl,
  GenericDetailsItem,
  GridForm,
  Select,
} from "shared/ui";
import { GetServicesResponse } from "entidades/service";
import { GetOwnersResponse } from "entidades/owner";
import { ServiceOptions } from "features/user/serviceListMultiple";
import { EditUserFormData } from "./editUser.lib";
export interface EditUserFormProps {
  user: UserProps;
  serviceList: GetServicesResponse;
  ownerList: GetOwnersResponse;
}
export const EditUserForm = ({ user, serviceList, ownerList }: EditUserFormProps) => {
  const {
    formState,
    register,
    handleSubmit,
    handleEditUser,
    serviceOptions,
    control,
    services,
    handleChangeOwnerSelected,
    owners,
    ownerSelected,
  } = useEditUser({
    user,
    serviceList,
    ownerList,
  });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleEditUser)}
      title={"Editar profissional"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/users/1"}
    >
      <GenericDetailsItem
        item={user}
        fields={[
          { id: "_id", label: "Id" },
          { id: "name", label: "Nome" },
          { id: "createdAt", label: "Data de criação" },
          { id: "email", label: "Email" },
          { id: "createdById", label: "Id do criador" },
          { id: "ownerId", label: "Id do estabelecimento" },
          { id: "myOwnerId", label: "Id do usuario do estabelecimento" },
        ]}
      />
      <GridForm>
        <FormControl
          label="Nome da profissional"
          error={formState.errors.name}
          {...register("name")}
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
        <ControlledSelect<EditUserFormData, ServiceOptions, true>
          isMulti
          control={control}
          label={"Serviços selecionados"}
          placeholder="Selecione pelo menos 1 serviço"
          options={serviceOptions}
          name={"serviceOptions"}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
