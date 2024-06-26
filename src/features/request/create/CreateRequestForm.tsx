import { useCreateRequest } from "./createRequest.hook";
import {
  BoxCreateItem,
  FormControl,
  Checkbox,
  GridForm,
  Select,
  DatePicker,
} from "@/shared/ui";
import { GetOwnersResponse } from "@/entidades/owner";

type CreateRequestFormProps = {
  ownerList: GetOwnersResponse;
};
export const CreateRequestForm = ({ ownerList }: CreateRequestFormProps) => {
  const {
    formState,
    register,
    handleSubmit,
    handleCreateRequest,
    active,
    setActive,
    handleChangeOwnerSelected,
    owners,
    ownerSelected,
    userSelected,
    handleChangeUserSelected,
    users,
    serviceSelected,
    handleChangeServiceSelected,
    services,
    setDateSelected,
    timeAvailable,
    timeSelected,
    handleChangeTimeSelected,
    clientSelected,
    handleChangeClientSelected,
    clients,
  } = useCreateRequest({ ownerList });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateRequest)}
      title={"Criar solicitação"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/requests/1"}
    >
      <GridForm>
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
          name="userList"
          label="Profissional prestador"
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
        <Select
          bg="purple.700"
          name="clientList"
          label="Cliente"
          list={clients}
          value={clientSelected}
          onChange={handleChangeClientSelected}
          keyValue="_id"
          keyLabel="name"
        >
          <option style={{ backgroundColor: "#7159c1" }} value="loadMore">
            Carregar mais
          </option>
        </Select>
        {ownerSelected?.length === 24 &&
          serviceSelected?.length === 24 &&
          userSelected?.length === 24 && (
            <DatePicker
              placeholder="Selecione uma data"
              name="date"
              label="Data do agendamento"
              onChange={(date: string) => {
                setDateSelected(date as any);
              }}
            />
          )}
        {ownerSelected?.length === 24 &&
          serviceSelected?.length === 24 &&
          userSelected?.length === 24 &&
          timeAvailable?.timeAvailable?.length > 0 && (
            <Select
              bg="purple.700"
              name="timeList"
              label="Horário disponível"
              list={timeAvailable?.timeAvailable ?? []}
              value={timeSelected ?? ""}
              onChange={handleChangeTimeSelected}
              keyValue="value"
              keyLabel="label"
            />
          )}
        <FormControl
          label="Observação"
          error={formState.errors.message}
          {...register("message")}
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
