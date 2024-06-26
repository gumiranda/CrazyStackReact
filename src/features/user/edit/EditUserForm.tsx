import { UserProps } from "@/entidades/user";
import { useEditUser } from "./editUser.hook";
import {
  BoxCreateItem,
  ControlledSelect,
  FormControl,
  GenericDetailsItem,
  GridForm,
  Select,
} from "@/shared/ui";
import { GetServicesResponse } from "@/entidades/service";
import { GetOwnersResponse } from "@/entidades/owner";
import { ServiceOptions } from "@/features/user/serviceListMultiple";
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
    handleChangeOwnerSelected,
    owners,
    ownerSelected,
  } = useEditUser({
    user,
    serviceList,
    ownerList,
  });
  const ControlledSelectAux = ControlledSelect as (props: any) => any;

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
          { id: "name", label: "Nome" },
          { id: "createdAt", label: "Data de criação" },
          { id: "email", label: "Email" },
        ]}
      />
      <GridForm>
        <FormControl
          label="Nome da profissional"
          error={formState.errors.name}
          {...register("name")}
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
          label={"Serviços selecionados"}
          placeholder="Selecione pelo menos 1 serviço"
          options={serviceOptions}
          name={"serviceOptions"}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
