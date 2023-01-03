import { UserProps } from "entidades/user";
import { useEditUser } from "./editUser.hook";
import {
  BoxCreateItem,
  FormControl,
  GenericDetailsItem,
  GridForm,
  Select,
} from "shared/ui";
import { GetServicesResponse } from "entidades/service";
import { GetOwnersResponse } from "entidades/owner";

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
    handleChangeServiceSelected,
    services,
    serviceSelected,
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
      </GridForm>
    </BoxCreateItem>
  );
};
